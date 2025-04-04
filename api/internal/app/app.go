package app

import (
	"context"
	"fmt"
	"log"

	firebase "firebase.google.com/go"

	"github.com/mikuto0831/camp2025_vol2/config"
	"google.golang.org/api/option"
)

// run
func Run(cfg *config.Config) {
	fmt.Println("App Name:", cfg.App.Name)

	// Initialize Firebase
	opt := option.WithCredentialsFile("firebase-adminsdk.json")
	_, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v", err)
	} else {
		fmt.Println("successfully initialized firebase app")
	}
}
