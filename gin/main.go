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
	gin.SetMode(config.Env().Mode)
	// 模式
	if gin.Mode() == gin.ReleaseMode {
		gin.DefaultWriter = ioutil.Discard //禁止控制台输出
	}
	// APP
	app := gin.Default()
	app.Use(gzip.Gzip(gzip.DefaultCompression)) //压缩
	app.Use(middleware.Cors())                  //允许跨域
	app.Use(middleware.Recovery)                //处理异常
	app.NoRoute(middleware.HandleNotFound)      //路由404
	app.NoMethod(middleware.HandleNotFound)     //请求方式404
	// 路由
	router.API(app)
	router.Admin(app)
	router.Home(app)
	// 运行
	app.Run(config.Env().Host + ":" + config.Env().Port)
}
