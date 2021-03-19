package router

import (
	"webmis/modules/admin"

	"github.com/gin-gonic/gin"
)

// Admin :路由
func Admin(r *gin.Engine) {
	g := r.Group("admin")
	// 允许跨域
	// g.Use(middleware.Cors())
	{
		// 首页
		g.GET("", (&admin.Index{}).Index)
		g.POST("index/getConfig", (&admin.Index{}).GetConfig)
		// 登录
		g.POST("user/login", (&admin.User{}).Login)
		g.POST("user/token", (&admin.User{}).Token)
		// 系统菜单
		g.POST("Sysmenus/getMenus", (&admin.SysMenus{}).GetMenus)
	}
}
