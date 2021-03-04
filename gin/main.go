package main

import (
	"io/ioutil"
	"webmis/config"
	"webmis/middleware"
	"webmis/router"

	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
)

func main() {
	// 配置
	cfg := (&config.Env{}).Config()
	// 模式
	gin.SetMode(cfg.Mode)
	if gin.Mode() == gin.ReleaseMode {
		gin.DefaultWriter = ioutil.Discard //禁止控制台输出
	}
	// 路由
	r := gin.Default()
	r.Use(gzip.Gzip(gzip.DefaultCompression)) //压缩
	r.Use(gin.Recovery())                     //处理异常
	// 日志
	r.Use(middleware.Logs())
	// Mvc
	router.Web(r)
	router.Api(r)
	router.Admin(r)
	// 运行
	r.Run(cfg.Host + ":" + cfg.Port)
}
