package router

import (
	"webmis/modules/home"

	"github.com/kataras/iris/v12"
)

func Web(r *iris.Application) {
	g := r.Party("/")
	{
		g.Get("/", home.Index)
		g.Get("/index", home.Index)
	}
}

// func Web(app *mvc.Application) {
// 	// 首页
// 	app.Party("/").Handle(new(home.IndexController))
// 	app.Party("/index").Handle(new(home.IndexController))
// 	app.Party("/index/{action}").Handle(new(home.IndexController))
// }
