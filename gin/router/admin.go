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
		g.GET("index/getConfig", (&admin.Index{}).GetConfig)
		g.POST("index/getChart", (&admin.Index{}).GetChart)
		// 登录
		g.POST("user/login", (&admin.User{}).Login)
		g.POST("user/token", (&admin.User{}).Token)
		// 个人资料
		g.POST("user_info/list", (&admin.UserInfo{}).List)
		g.POST("user_info/edit", (&admin.UserInfo{}).Edit)
		g.POST("user_info/upimg", (&admin.UserInfo{}).Upimg)
		// 修改密码
		g.POST("user_passwd/edit", (&admin.UserPasswd{}).Edit)
		// 文件管理
		g.POST("sysfile/list", (&admin.SysFile{}).List)
		g.POST("sysfile/mkdir", (&admin.SysFile{}).Mkdir)
		g.POST("sysfile/rename", (&admin.SysFile{}).Rename)
		g.POST("sysfile/upload", (&admin.SysFile{}).Upload)
		g.POST("sysfile/down", (&admin.SysFile{}).Down)
		g.POST("sysfile/remove", (&admin.SysFile{}).Remove)
		// 用户管理
		g.POST("sys_user/list", (&admin.SysUser{}).List)
		g.POST("sys_user/add", (&admin.SysUser{}).Add)
		g.POST("sys_user/edit", (&admin.SysUser{}).Edit)
		g.POST("sys_user/del", (&admin.SysUser{}).Del)
		g.POST("sys_user/state", (&admin.SysUser{}).State)
		g.POST("sys_user/perm", (&admin.SysUser{}).Perm)
		g.POST("sys_user/info", (&admin.SysUser{}).Info)
		// API菜单
		g.POST("apimenus/list", (&admin.ApiMenus{}).List)
		g.POST("apimenus/add", (&admin.ApiMenus{}).Add)
		g.POST("apimenus/edit", (&admin.ApiMenus{}).Edit)
		g.POST("apimenus/del", (&admin.ApiMenus{}).Del)
		g.POST("apimenus/perm", (&admin.ApiMenus{}).Perm)
		// API角色
		g.POST("api_role/list", (&admin.ApiRole{}).List)
		g.POST("api_role/add", (&admin.ApiRole{}).Add)
		g.POST("api_role/edit", (&admin.ApiRole{}).Edit)
		g.POST("api_role/del", (&admin.ApiRole{}).Del)
		g.POST("api_role/perm", (&admin.ApiRole{}).Perm)
		g.POST("api_role/permList", (&admin.ApiRole{}).PermList)
		g.POST("api_role/roleList", (&admin.ApiRole{}).RoleList)
		// 系统菜单
		g.POST("sys_menus/list", (&admin.SysMenus{}).List)
		g.POST("sys_menus/add", (&admin.SysMenus{}).Add)
		g.POST("sys_menus/edit", (&admin.SysMenus{}).Edit)
		g.POST("sys_menus/del", (&admin.SysMenus{}).Del)
		g.POST("sys_menus/perm", (&admin.SysMenus{}).Perm)
		g.POST("sys_menus/getMenus", (&admin.SysMenus{}).GetMenus)
		// 系统角色
		g.POST("sysrole/list", (&admin.SysRole{}).List)
		g.POST("sysrole/add", (&admin.SysRole{}).Add)
		g.POST("sysrole/edit", (&admin.SysRole{}).Edit)
		g.POST("sysrole/del", (&admin.SysRole{}).Del)
		g.POST("sysrole/perm", (&admin.SysRole{}).Perm)
		g.POST("sysrole/permList", (&admin.SysRole{}).PermList)
		g.POST("sysrole/roleList", (&admin.SysRole{}).RoleList)
		// 系统配置
		g.POST("sysconfig/list", (&admin.SysConfig{}).List)
		g.POST("sysconfig/edit", (&admin.SysConfig{}).Edit)
		g.POST("sysconfig/upimg", (&admin.SysConfig{}).Upimg)
	}
}
