package home

import (
	"github.com/kataras/iris/v12"
)

type IndexController struct {
	// a string
}

func (c *IndexController) Get(ctx iris.Context)  { params(ctx) }
func (c *IndexController) Post(ctx iris.Context) { params(ctx) }
func params(ctx iris.Context) {
	a := ctx.Params().Get("action")
	if a == "" || a == "index" {
		index(ctx)
	}
}

/* 首页 */
func index(ctx iris.Context) {
	ctx.JSON(iris.Map{"code": 0, "msg": "Web"})
}
