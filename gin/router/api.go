package router

import (
	"webmis/modules/api"

	"github.com/gin-gonic/gin"
)

/* API路由 */
func API(r *gin.Engine) {
	g := r.Group("api")
	{
		// 首页
		g.GET("", (&api.Index{}).Index)
		g.GET("index", (&api.Index{}).Index)
		// 登录
		g.POST("user/login", (&api.User{}).Login)
		g.POST("user/token", (&api.User{}).Token)
	}
}
