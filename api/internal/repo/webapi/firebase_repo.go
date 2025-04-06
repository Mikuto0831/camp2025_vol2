package webapi

import (
	"context"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"github.com/mikuto0831/camp2025_vol2/internal/entity"
)

type AuthRepository struct {
    authClient *auth.Client
}

// NewAuthRepository creates a new Firebase auth repository
func NewAuthRepository(app *firebase.App) (*AuthRepository, error) {
    authClient, err := app.Auth(context.Background())
    if err != nil {
        return nil, err
    }
    return &AuthRepository{authClient: authClient}, nil
}

// VerifyIDToken verifies an ID token
func (r *AuthRepository) VerifyIDToken(ctx context.Context, idToken string) (*entity.UserInfo, error) {    
    token, err := r.authClient.VerifyIDToken(ctx, idToken)
    if err != nil {
        return nil, err
    }
    
    return r.GetUser(ctx, token.UID)
}

// GetUser retrieves a user by their UID
func (r *AuthRepository) GetUser(ctx context.Context, uid string) (*entity.UserInfo, error) {
    user, err := r.authClient.GetUser(ctx, uid)
    if err != nil {
        return nil, err
    }
    
    return &entity.UserInfo{
        UID:         user.UID,
        Email:       user.Email,
        DisplayName: user.DisplayName,
        PhotoURL:    user.PhotoURL,
    }, nil
}

// CreateUser creates a new user
func (r *AuthRepository) CreateUser(ctx context.Context, email, password string) (*entity.UserInfo, error) {
    params := (&auth.UserToCreate{}).
        Email(email).
        Password(password)
    user, err := r.authClient.CreateUser(ctx, params)
    if err != nil {
        return nil, err
    }
    
    return &entity.UserInfo{
        UID:         user.UID,
        Email:       user.Email,
        DisplayName: user.DisplayName,
        PhotoURL:    user.PhotoURL,
    }, nil
}