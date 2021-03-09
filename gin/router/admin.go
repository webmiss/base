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
		g.GET("", (&admin.Index{}).Index)
		g.GET("index", (&admin.Index{}).Index)
		g.POST("index/getConfig", (&admin.Index{}).GetConfig)
		// 登录
		g.POST("user/login", (&admin.User{}).Login)
	}
}
