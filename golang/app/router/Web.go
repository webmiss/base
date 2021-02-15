package router

import (
	"webmis/app/modules/home"

	"github.com/kataras/iris/v12/mvc"
)

func Web(app *mvc.Application) {
	// 首页
	app.Party("/").Handle(new(home.IndexController))
	app.Party("/index").Handle(new(home.IndexController))
	app.Party("/index/{action}").Handle(new(home.IndexController))
}
