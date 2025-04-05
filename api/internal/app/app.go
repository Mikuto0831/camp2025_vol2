package app

import (
	"context"
	"log"

	firebase "firebase.google.com/go"

	"github.com/mikuto0831/camp2025_vol2/config"
	"github.com/mikuto0831/camp2025_vol2/internal/repo/db"
	"github.com/mikuto0831/camp2025_vol2/pkg/logger"
	"google.golang.org/api/option"
	"github.com/jackc/pgx/v5"
)

// run
func Run(ctx context.Context, cfg *config.Config) {
	l := logger.New(cfg.Log.LogLevel)

	l.Info("App Name: %s", cfg.App.Name)

	// Repositroy
	conn, err := pgx.Connect(ctx, "postgres://user:password@postgis:5432/gis")
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer conn.Close(ctx)

	// Queriesインスタンスの作成
	queries := db.New(conn)

	// Initialize Firebase
	opt := option.WithCredentialsFile("firebase-adminsdk.json")
	fb_app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v", err)
	} else {
		l.Info("successfully initialized firebase app")
	}

	l.Info("%s", queries)

	client, err := fb_app.Auth(ctx)
	if err != nil {
		log.Fatalf("error getting Auth client: %v", err)
	}

	u, err := client.GetUser(ctx, "pLCe1daykgdyUli0JKG0vECOGUy2")
	if err != nil {
		log.Fatalf("error getting user: %v", err)
	} else {
		l.Info("Successfully fetched user data: %v\n", u.Email)
	}
}
