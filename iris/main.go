package main

import (
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/logger"

	"webmis/config"
	"webmis/router"
)

func main() {
	app := iris.New()
	cfg := (&config.Env{}).Config() //配置
	// app.Use(config.Recover)         //异常捕捉
	if cfg.Mode == "debug" {
		app.Use(logger.New()) //终端请求信息
	}
	// 路由
	router.Web(app)
	router.Api(app)
	router.Admin(app)
	// 运行
	app.Listen(cfg.Host + ":" + cfg.Port)
}
