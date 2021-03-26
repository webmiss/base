package router

import (
	"webmis/modules/admin"

	"github.com/gin-gonic/gin"
)

// Admin :路由
func Admin(r *gin.Engine) {
	g := r.Group("admin")
	{
		// 首页
		g.GET("", (&admin.Index{}).Index)
		g.POST("index/getConfig", (&admin.Index{}).GetConfig)
		// 登录
		g.POST("user/login", (&admin.User{}).Login)
		g.POST("user/token", (&admin.User{}).Token)
		// 个人资料
		g.POST("userinfo/list", (&admin.UserInfo{}).List)
		g.POST("userinfo/edit", (&admin.UserInfo{}).Edit)
		g.POST("userinfo/upimg", (&admin.UserInfo{}).Upimg)
		// 系统菜单
		g.POST("Sysmenus/getMenus", (&admin.SysMenus{}).GetMenus)
	}
}
