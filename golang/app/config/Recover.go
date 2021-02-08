package config

import (
	"fmt"

	"github.com/kataras/iris/v12"
)

/* 异常捕捉 */
func Recover(ctx iris.Context) {
	defer func() {
		if err := recover(); err != nil {
			if ctx.IsStopped() {
				return
			}
			// 返回结果
			msg := fmt.Sprintf("%s", err)
			ctx.JSON(iris.Map{"code": 5000, "msg": msg})
			ctx.StatusCode(500)
			ctx.StopExecution()
			println("错误信息:" + msg)
		}
	}()
	ctx.Next()
}
