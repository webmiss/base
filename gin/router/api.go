package router

import (
	"webmis/middleware"
	"webmis/modules/api"

	"github.com/gin-gonic/gin"
)

func Api(r *gin.Engine) {
	g := r.Group("api")
	// 允许跨域
	g.Use(middleware.Cors())
	{
		// 首页
		g.GET("", api.Index)
		g.GET("index", api.Index)
	}
}
