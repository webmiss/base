package router

import (
	"webmis/middleware"
	"webmis/modules/admin"

	"github.com/kataras/iris/v12"
)

func Admin(r *iris.Application) {
	g := r.Party("/admin")
	// 允许跨域
	g.Use(middleware.Cors)
	{
		g.Get("/", admin.Index)
		g.Get("/index", admin.Index)
	}
}
