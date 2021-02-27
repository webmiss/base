package api

import (
	"github.com/kataras/iris/v12"
)

/* 首页 */
func Index(ctx iris.Context) {
	ctx.JSON(iris.Map{"code": 0, "msg": "Api"})
}
