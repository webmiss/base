package main

import (
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/logger"
	"github.com/kataras/iris/v12/mvc"

	"golang/app"
	"golang/app/config"
	"golang/app/router"
)

/* 构造函数 */
func main() {
	obj := iris.New()
	cfg := app.Env()        //配置
	obj.Use(config.Cors)    //允许跨域请求
	obj.Use(config.Recover) //异常捕捉
	if cfg["debug"] == "true1" {
		obj.Use(logger.New()) //终端请求信息
	}
	// HMVC
	mvc.Configure(obj.Party("/"), router.Web)
	mvc.Configure(obj.Party("/api"), router.Api)
	mvc.Configure(obj.Party("/admin"), router.Admin)
	// 运行
	obj.Listen(":"+cfg["port"], iris.WithoutBodyConsumptionOnUnmarshal)
}
