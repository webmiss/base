package router

import (
	"golang/app/modules/api"

	"github.com/kataras/iris/v12/mvc"
)

func Api(app *mvc.Application) {
	// 首页
	app.Party("/").Handle(new(api.IndexController))
	app.Party("/index").Handle(new(api.IndexController))
	app.Party("/index/{action}").Handle(new(api.IndexController))
}
