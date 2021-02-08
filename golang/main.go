package main

import (
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/logger"

	// "github.com/kataras/iris/v12/middleware/recover"
	"github.com/kataras/iris/v12/mvc"

	"golang/app"
	"golang/app/config"
	"golang/app/modules/admin"
	"golang/app/modules/api"
	"golang/app/modules/home"
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
	mvc.Configure(obj.Party("/"), _web)
	mvc.Configure(obj.Party("/api"), _api)
	mvc.Configure(obj.Party("/admin"), _admin)
	// 运行
	obj.Listen(":"+cfg["port"], iris.WithoutBodyConsumptionOnUnmarshal)
}

/* WEB */
func _web(app *mvc.Application) {
	// 首页
	app.Party("/").Handle(new(home.IndexController))
	app.Party("/index").Handle(new(home.IndexController))
	app.Party("/index/{action}").Handle(new(home.IndexController))
}

/* API */
func _api(app *mvc.Application) {
	// 首页
	app.Party("/").Handle(new(api.IndexController))
	app.Party("/index").Handle(new(api.IndexController))
	app.Party("/index/{action}").Handle(new(api.IndexController))
}

/* Admin */
func _admin(app *mvc.Application) {
	// 首页
	app.Party("/").Handle(new(admin.IndexController))
	app.Party("/index").Handle(new(admin.IndexController))
	app.Party("/index/{action}").Handle(new(admin.IndexController))
}
