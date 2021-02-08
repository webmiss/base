package home

import (
	"golang/app/model"

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

type Result struct {
	uid   int
	title string
}

/* 首页 */
func index(ctx iris.Context) {
	result := map[string]interface{}{}
	(&model.Demo{}).Init().Find().Scan(&result)
	ctx.JSON(iris.Map{"code": 0, "msg": "Web", "data": result})
}
