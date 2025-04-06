package router

import (
    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
    "github.com/mikuto0831/camp2025_vol2/internal/controller"
)

// Router はルート設定を行う構造体
type Router struct {
    e             *echo.Echo
    authController *controller.AuthController
    // 他のコントローラーを追加
}

// NewRouter は新しいRouterインスタンスを作成する
func NewRouter(
    authController *controller.AuthController,
    // 他のコントローラーを引数に追加
) *Router {
    e := echo.New()

    // ミドルウェアの設定
    e.Use(middleware.Logger())
    e.Use(middleware.Recover())

    return &Router{
        e:             e,
        authController: authController,
        // 他のコントローラーを初期化
    }
}

func helloweb(c echo.Context) error {
    return c.String(200, "Hello, World!")
}

// SetupRoutes はルート設定を行う
func (r *Router) SetupRoutes() {
    // 認証関連ルート
    auth := r.e.Group("/auth")
    {
        auth.POST("/login", r.authController.VerifyIDToken)
    }

    r.e.GET("/", helloweb)
}

// Start はサーバーを起動する
func (r *Router) Start(address string) error {
    return r.e.Start(address)
}

// Echo はEchoインスタンスを返す
func (r *Router) Echo() *echo.Echo {
    return r.e
}