package router

import (
	"webmis/middleware"
	"webmis/modules/api"

	"github.com/kataras/iris/v12"
)

func Api(r *iris.Application) {
	g := r.Party("/api")
	// 允许跨域
	g.Use(middleware.Cors)
	{
		g.Get("/", api.Index)
		g.Get("/index", api.Index)
	}
}
