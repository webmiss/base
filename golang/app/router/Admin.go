package router

import (
	"webmis/app/modules/admin"

	"github.com/kataras/iris/v12/mvc"
)

func Admin(app *mvc.Application) {
	// 首页
	app.Party("/").Handle(new(admin.IndexController))
	app.Party("/index").Handle(new(admin.IndexController))
	app.Party("/index/{action}").Handle(new(admin.IndexController))
}
