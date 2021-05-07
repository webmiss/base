package router

import (
	"webmis/modules/demo"

	"github.com/gin-gonic/gin"
)

/* Demo路由 */
func Demo(r *gin.Engine) {
	g := r.Group("demo")
	{
		// 首页
		g.GET("", (&demo.Index{}).Index)
		g.GET("index", (&demo.Index{}).Index)
	}
}
