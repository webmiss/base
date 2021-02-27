package router

import (
	"webmis/modules/api"

	"github.com/kataras/iris/v12"
)

func Api(r *iris.Application) {
	g := r.Party("/api")
	{
		g.Get("/", api.Index)
		g.Get("/index", api.Index)
	}
}
