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
		// 会员菜单
		g.POST("apimenus/list", (&admin.ApiMenus{}).List)
		g.POST("apimenus/add", (&admin.ApiMenus{}).Add)
		g.POST("apimenus/edit", (&admin.ApiMenus{}).Edit)
		g.POST("apimenus/del", (&admin.ApiMenus{}).Del)
		g.POST("apimenus/perm", (&admin.ApiMenus{}).Perm)
		// 会员角色
		g.POST("apirole/list", (&admin.ApiRole{}).List)
		g.POST("apirole/add", (&admin.ApiRole{}).Add)
		g.POST("apirole/edit", (&admin.ApiRole{}).Edit)
		g.POST("apirole/del", (&admin.ApiRole{}).Del)
		// 系统菜单
		g.POST("sysmenus/list", (&admin.SysMenus{}).List)
		g.POST("sysmenus/add", (&admin.SysMenus{}).Add)
		g.POST("sysmenus/edit", (&admin.SysMenus{}).Edit)
		g.POST("sysmenus/del", (&admin.SysMenus{}).Del)
		g.POST("sysmenus/perm", (&admin.SysMenus{}).Perm)
		g.POST("sysmenus/getMenus", (&admin.SysMenus{}).GetMenus)
		// 系统角色
		g.POST("sysrole/list", (&admin.SysRole{}).List)
		g.POST("sysrole/add", (&admin.SysRole{}).Add)
		g.POST("sysrole/edit", (&admin.SysRole{}).Edit)
		g.POST("sysrole/del", (&admin.SysRole{}).Del)
		g.POST("sysrole/perm", (&admin.SysRole{}).Perm)
		g.POST("sysrole/permList", (&admin.SysRole{}).PermList)
		// 系统配置
		g.POST("sysconfig/list", (&admin.SysConfig{}).List)
		g.POST("sysconfig/edit", (&admin.SysConfig{}).Edit)
		g.POST("sysconfig/upimg", (&admin.SysConfig{}).Upimg)
	}
}
