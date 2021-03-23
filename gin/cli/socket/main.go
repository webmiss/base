package main

import (
	"io/ioutil"
	"webmis/config"
	"webmis/service"

	"github.com/gin-gonic/gin"
)

func main() {
	// 配置
	gin.SetMode(gin.ReleaseMode)
	gin.DefaultWriter = ioutil.Discard
	// 路由
	cfg := config.Socket()
	r := gin.Default()
	r.GET(cfg.URL, func(c *gin.Context) {
		service.Socket(c)
	})
	r.Run(cfg.Host + ":" + cfg.Port)
}
