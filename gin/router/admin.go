package router

import (
	"webmis/modules/admin"

	"github.com/gin-gonic/gin"
)

/* Admin路由 */
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
		// 修改密码
		g.POST("userpasswd/edit", (&admin.UserPasswd{}).Edit)
		// 文件管理
		g.POST("sysfile/list", (&admin.SysFile{}).List)
		g.POST("sysfile/mkdir", (&admin.SysFile{}).Mkdir)
		g.POST("sysfile/rename", (&admin.SysFile{}).Rename)
		g.POST("sysfile/upload", (&admin.SysFile{}).Upload)
		g.POST("sysfile/down", (&admin.SysFile{}).Down)
		g.POST("sysfile/remove", (&admin.SysFile{}).Remove)
		// 用户管理
		g.POST("sysuser/list", (&admin.SysUser{}).List)
		g.POST("sysuser/add", (&admin.SysUser{}).Add)
		g.POST("sysuser/edit", (&admin.SysUser{}).Edit)
		g.POST("sysuser/del", (&admin.SysUser{}).Del)
		g.POST("sysuser/state", (&admin.SysUser{}).State)
		g.POST("sysuser/info", (&admin.SysUser{}).Info)
		// 系统菜单
		g.POST("sysmenus/getMenus", (&admin.SysMenus{}).GetMenus)
	}
}
