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
		g.POST("sys_file/list", (&admin.SysFile{}).List)
		g.POST("sys_file/mkdir", (&admin.SysFile{}).Mkdir)
		g.POST("sys_file/rename", (&admin.SysFile{}).Rename)
		g.POST("sys_file/upload", (&admin.SysFile{}).Upload)
		g.POST("sys_file/down", (&admin.SysFile{}).Down)
		g.POST("sys_file/remove", (&admin.SysFile{}).Remove)
		// 用户管理
		g.POST("sys_user/list", (&admin.SysUser{}).List)
		g.POST("sys_user/add", (&admin.SysUser{}).Add)
		g.POST("sys_user/edit", (&admin.SysUser{}).Edit)
		g.POST("sys_user/del", (&admin.SysUser{}).Del)
		g.POST("sys_user/state", (&admin.SysUser{}).State)
		g.POST("sys_user/perm", (&admin.SysUser{}).Perm)
		g.POST("sys_user/info", (&admin.SysUser{}).Info)
		// API菜单
		g.POST("api_menus/list", (&admin.ApiMenus{}).List)
		g.POST("api_menus/add", (&admin.ApiMenus{}).Add)
		g.POST("api_menus/edit", (&admin.ApiMenus{}).Edit)
		g.POST("api_menus/del", (&admin.ApiMenus{}).Del)
		g.POST("api_menus/perm", (&admin.ApiMenus{}).Perm)
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
		g.POST("sys_role/list", (&admin.SysRole{}).List)
		g.POST("sys_role/add", (&admin.SysRole{}).Add)
		g.POST("sys_role/edit", (&admin.SysRole{}).Edit)
		g.POST("sys_role/del", (&admin.SysRole{}).Del)
		g.POST("sys_role/perm", (&admin.SysRole{}).Perm)
		g.POST("sys_role/permList", (&admin.SysRole{}).PermList)
		g.POST("sys_role/roleList", (&admin.SysRole{}).RoleList)
		// 系统配置
		g.POST("sys_config/list", (&admin.SysConfig{}).List)
		g.POST("sys_config/edit", (&admin.SysConfig{}).Edit)
		g.POST("sys_config/upimg", (&admin.SysConfig{}).Upimg)
		// 新闻分类
		g.POST("news/list", (&admin.WebNews{}).List)
		g.POST("news/add", (&admin.WebNews{}).Add)
		g.POST("news/edit", (&admin.WebNews{}).Edit)
		g.POST("news/del", (&admin.WebNews{}).Del)
		g.POST("news/state", (&admin.WebNews{}).State)
		g.POST("news/get_class", (&admin.WebNews{}).GetClass)
		g.POST("news/get_content", (&admin.WebNews{}).GetContent)
		g.POST("news/content", (&admin.WebNews{}).Content)
		g.POST("news/up_img", (&admin.WebNews{}).UpImg)
		// 新闻分类
		g.POST("news_class/list", (&admin.WebNewsClass{}).List)
		g.POST("news_class/add", (&admin.WebNewsClass{}).Add)
		g.POST("news_class/edit", (&admin.WebNewsClass{}).Edit)
		g.POST("news_class/del", (&admin.WebNewsClass{}).Del)
		g.POST("news_class/state", (&admin.WebNewsClass{}).State)
	}
}
