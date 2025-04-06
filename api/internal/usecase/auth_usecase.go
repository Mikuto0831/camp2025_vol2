package usecase

import (
	"context"

	"github.com/mikuto0831/camp2025_vol2/internal/entity"
	"github.com/mikuto0831/camp2025_vol2/internal/repo"
)

// AuthUseCase 認証関連のユースケースを定義
type AuthUseCase struct {
	authRepo repo.AuthRepository
	userRepo repo.UserRepository
}

func NewAuthUseCase(authRepo repo.AuthRepository, userRepo repo.UserRepository) *AuthUseCase {
	return &AuthUseCase{
		authRepo: authRepo,
		userRepo: userRepo,
	}
}

// Firebase Auth
func (uc *AuthUseCase) VerifyIDToken(ctx context.Context, idToken string) (*entity.User, error) {
	userInfo, err := uc.authRepo.VerifyIDToken(ctx, idToken)
	if err != nil {
		return nil, err
	}

	user, err := uc.userRepo.GetUserByUid(ctx, userInfo.UID)
	if err != nil {
		return nil, err
	}
	return &user, nil
}
