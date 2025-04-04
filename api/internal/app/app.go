package app

import (
	"fmt"
	
	"github.com/mikuto0831/camp2025_vol2/config"
)

// run
func Run(cfg *config.Config){
	fmt.Println("App Name:", cfg.App.Name)
}