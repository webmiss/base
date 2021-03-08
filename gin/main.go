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
	app := gin.Default()
	// 模式
	gin.SetMode(cfg.Mode)
	if gin.Mode() == gin.ReleaseMode {
		gin.DefaultWriter = ioutil.Discard //禁止控制台输出
		app.Use(middleware.Logs())         //访问日志
	}
	app.Use(gzip.Gzip(gzip.DefaultCompression)) //压缩
	app.Use(gin.Recovery())                     //处理异常
	// 路由
	router.Home(app)
	router.Api(app)
	router.Admin(app)
	// 运行
	app.Run(cfg.Host + ":" + cfg.Port)
}
