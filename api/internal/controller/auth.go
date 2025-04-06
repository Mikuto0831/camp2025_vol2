package controller

import (
	"github.com/labstack/echo/v4"
	"github.com/mikuto0831/camp2025_vol2/internal/usecase/dto/output"
	"github.com/mikuto0831/camp2025_vol2/internal/presenter"
	"github.com/mikuto0831/camp2025_vol2/internal/usecase"
)

type AuthController struct {
	authUseCase *usecase.AuthUseCase
	authPresenter *presenter.AuthPresenter
	errerPresenter *presenter.ErrorPresenter
}

func NewAuthController(
		authUseCase *usecase.AuthUseCase,
		authPresenter *presenter.AuthPresenter,
		errerPresenter *presenter.ErrorPresenter,
	) *AuthController {
	return &AuthController{
		authUseCase: authUseCase,
		authPresenter: authPresenter,
		errerPresenter: errerPresenter,
	}
}

func (auth *AuthController) VerifyIDToken(c echo.Context) error {
	idToken := c.Request().Header.Get("Authorization")
	if idToken == "" {
		return auth.errerPresenter.PresentUnauthorized(c, "Authorization header is required")
	}

	user, err := auth.authUseCase.VerifyIDToken(c.Request().Context(), idToken)
	if err != nil {
		return auth.errerPresenter.PresentBadRequest(c, err.Error())
	}

	output := &output.AuthOutput{
		User: user,
	}
	return auth.authPresenter.PresentVerifyIDToken(c, output)
}
