package app

import (
	"context"
	"fmt"

	firebase "firebase.google.com/go"

	"github.com/jackc/pgx/v5"
	"github.com/mikuto0831/camp2025_vol2/config"
	"github.com/mikuto0831/camp2025_vol2/internal/controller"
	router "github.com/mikuto0831/camp2025_vol2/internal/infra"
	"github.com/mikuto0831/camp2025_vol2/internal/presenter"
	"github.com/mikuto0831/camp2025_vol2/internal/repo/db"
	"github.com/mikuto0831/camp2025_vol2/internal/repo/webapi"
	"github.com/mikuto0831/camp2025_vol2/internal/usecase"
	"github.com/mikuto0831/camp2025_vol2/pkg/logger"
	"google.golang.org/api/option"
)

// run
func Run(ctx context.Context, cfg *config.Config) {
	l := logger.New(cfg.Log.LogLevel)

	l.Info("App Name: %s", cfg.App.Name)

	// Repositroy
	conn, err := pgx.Connect(ctx, "postgres://user:password@localhost:5432/gis")
	if err != nil {
		l.Fatal("Unable to connect to database: %v\n", err)
	}
	defer conn.Close(ctx)

	// Queriesインスタンスの作成
	queries := db.New(conn)

	// Initialize Firebase
	opt := option.WithCredentialsFile("firebase-adminsdk.json")
	fb_app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		l.Fatal("error initializing app: %v", err)
	}

	auth, err := webapi.NewAuthRepository(fb_app)
	if err != nil {
		l.Fatal("error initializing auth repository: %v", err)
	}

	// AuthUseCaseインスタンスの作成
	authUseCase := usecase.NewAuthUseCase(auth, queries)

	// コントローラーの作成
    authController := controller.NewAuthController(
        authUseCase, 
        presenter.NewAuthPresenter(), 
        presenter.NewErrorPresenter(),
    )

    // ルーターの初期化と設定
    r := router.NewRouter(
		authController,
	)
    r.SetupRoutes()

    // サーバー起動
    serverAddr := fmt.Sprintf(":%d", cfg.App.Port) // ポート設定を追加
    l.Info("Starting server at %s", serverAddr)
    if err := r.Start(serverAddr); err != nil {
        l.Fatal("Server error: %v", err)
    }
}
