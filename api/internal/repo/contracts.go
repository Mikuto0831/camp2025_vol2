package repo

import (
    "context"
    "github.com/mikuto0831/camp2025_vol2/internal/entity"
)

// AuthRepository は認証関連の操作を定義
type AuthRepository interface {
    VerifyIDToken(ctx context.Context, idToken string) (*entity.UserInfo, error)
    GetUser(ctx context.Context, uid string) (*entity.UserInfo, error)
    CreateUser(ctx context.Context, email, password string) (*entity.UserInfo, error)
}

// UserRepository はユーザー関連のDB操作を定義
type UserRepository interface {
    GetUserByUid(ctx context.Context, uid string) (entity.User, error)
}