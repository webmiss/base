package main

import (
	"io/ioutil"
	"webmis/config"
	"webmis/library"

	"github.com/gin-gonic/gin"
)

func main() {
	// 配置
	gin.SetMode(gin.ReleaseMode)
	gin.DefaultWriter = ioutil.Discard
	// 路由
	cfg := (&config.Socket{}).Config()
	r := gin.Default()
	r.GET(cfg.Url, func(c *gin.Context) {
		library.Socket(c)
	})
	r.Run(cfg.Host + ":" + cfg.Port)
}