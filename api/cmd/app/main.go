package main

import (
	"log"

	"github.com/mikuto0831/camp2025_vol2/internal/app"
	"github.com/mikuto0831/camp2025_vol2/config"
)

func main() {
	cfg, err := config.NewConfig()
	if err != nil {
		log.Fatalf("Config error: %s",err)
	}

	app.Run(cfg)
}