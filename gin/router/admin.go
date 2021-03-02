package router

import (
	"webmis/middleware"
	"webmis/modules/admin"

	"github.com/gin-gonic/gin"
)

func Admin(r *gin.Engine) {
	g := r.Group("admin")
	// 允许跨域
	g.Use(middleware.Cors())
	{
		// 首页
		g.GET("", admin.Index)
		g.GET("index", admin.Index)
		g.POST("index/getConfig", admin.GetConfig)
	}
}
