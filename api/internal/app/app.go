package app

import (
	"context"
	"log"

	firebase "firebase.google.com/go"

	"github.com/mikuto0831/camp2025_vol2/config"
	"github.com/mikuto0831/camp2025_vol2/pkg/logger"
	"google.golang.org/api/option"
)

// run
func Run(cfg *config.Config) {
	l := logger.New(cfg.Log.LogLevel)

	l.Info("App Name: %s", cfg.App.Name)

	// Repositroy
	

	// Initialize Firebase
	opt := option.WithCredentialsFile("firebase-adminsdk.json")
	_, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v", err)
	} else {
		l.Info("successfully initialized firebase app")
	}
}
