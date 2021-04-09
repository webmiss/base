package task

import (
	"io/ioutil"
	"webmis/config"
	"webmis/service"

	"github.com/gin-gonic/gin"
)

type Socket struct{}

func (Socket) Start() {
	// 配置
	gin.SetMode(gin.ReleaseMode)
	gin.DefaultWriter = ioutil.Discard
	// 路由
	cfg := config.Socket()
	r := gin.Default()
	r.GET(cfg.URL, func(c *gin.Context) {
		(&service.SocketType{}).Socket(c)
	})
	r.Run(cfg.Host + ":" + cfg.Port)
}
