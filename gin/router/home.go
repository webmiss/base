package router

import (
	"webmis/middleware"
	"webmis/modules/home"

	"github.com/gin-gonic/gin"
)

// Home :路由
func Home(r *gin.Engine) {
	g := r.Group("")
	// 允许跨域
	g.Use(middleware.Cors())
	{
		// 首页
		g.GET("/", (&home.Index{}).Index)
		g.GET("index", (&home.Index{}).Index)
	}
}
