package router

import (
	"webmis/modules/admin"

	"github.com/kataras/iris/v12"
)

func Admin(r *iris.Application) {
	g := r.Party("/admin")
	{
		g.Get("/", admin.Index)
		g.Get("/index", admin.Index)
	}
}
