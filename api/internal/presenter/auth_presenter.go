package presenter

import (
	"net/http"
	
	"github.com/labstack/echo/v4"
	"github.com/mikuto0831/camp2025_vol2/internal/usecase/dto/output"
)

type IAuthPresenter interface {
	PresentVerifyIDToken(c echo.Context, output *output.AuthOutput) error
}

type AuthPresenter struct{}

func NewAuthPresenter() *AuthPresenter {
	return &AuthPresenter{}
}

func (p *AuthPresenter) PresentVerifyIDToken(c echo.Context, output *output.AuthOutput) error {
	response := output.User
	return c.JSON(http.StatusOK, response)
}
