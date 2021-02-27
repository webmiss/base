package router

import (
	"webmis/middleware"
	"webmis/modules/home"

	"github.com/gin-gonic/gin"
)

func Web(r *gin.Engine) {
	g := r.Group("")
	// 允许跨域
	g.Use(middleware.Cors())
	{
		// 首页
		g.GET("/", home.Index)
		g.GET("index", home.Index)
	}
}
