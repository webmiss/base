package main

import (
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/mvc"

	// "golang/app"
	"golang/app/config"
	"golang/app/modules/admin"
	"golang/app/modules/api"
	"golang/app/modules/home"
)

/* 构造函数 */
func main() {
	obj := iris.New()
	obj.Use(config.Cors)
	// HMVC
	mvc.Configure(obj.Party("/"), _web)
	mvc.Configure(obj.Party("/api"), _api)
	mvc.Configure(obj.Party("/admin"), _admin)
	// 运行
	obj.Listen(":9010")
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
