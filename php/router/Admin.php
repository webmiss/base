<?php
namespace Router;

use Illuminate\Container\Container;
use Middleware\Cors;

class Admin {

  static function Init(){
    // 允许跨域请求
    Cors::Init();
    // 路由
    $app = Container::getInstance();
    $app['router']->group(['namespace'=>'App\Admin'], function($router){
      // 首页
      $router->get('/admin', "Index@Index");
      $router->get('/admin/index/getConfig', "Index@GetConfig");
      $router->post('/admin/index/getChart', "Index@GetChart");
      // 登录
      $router->post('/admin/user/login', "User@Login");
      $router->post('/admin/user/token', "User@Token");
      // 个人资料
      $router->post('/admin/user_info/list', "UserInfo@List");
      $router->post('/admin/user_info/edit', "UserInfo@Edit");
      $router->post('/admin/user_info/upimg', "UserInfo@Upimg");
      // 修改密码
      $router->post('/admin/user_passwd/edit', "UserPasswd@Edit");
      // 文件管理
      $router->post('/admin/sys_file/list', "SysFile@List");
      $router->post('/admin/sys_file/mkdir', "SysFile@Mkdir");
      $router->post('/admin/sys_file/rename', "SysFile@Rename");
      $router->post('/admin/sys_file/upload', "SysFile@Upload");
      $router->post('/admin/sys_file/down', "SysFile@Down");
      $router->post('/admin/sys_file/remove', "SysFile@Remove");
      // 用户管理
      $router->post('/admin/sys_user/list', "SysUser@List");
      $router->post('/admin/sys_user/add', "SysUser@Add");
      $router->post('/admin/sys_user/edit', "SysUser@Edit");
      $router->post('/admin/sys_user/del', "SysUser@Del");
      $router->post('/admin/sys_user/state', "SysUser@State");
      $router->post('/admin/sys_user/perm', "SysUser@Perm");
      $router->post('/admin/sys_user/info', "SysUser@Info");
      // API菜单
      $router->post('/admin/api_menus/list', "ApiMenus@List");
      $router->post('/admin/api_menus/add', "ApiMenus@Add");
      $router->post('/admin/api_menus/edit', "ApiMenus@Edit");
      $router->post('/admin/api_menus/del', "ApiMenus@Del");
      $router->post('/admin/api_menus/perm', "ApiMenus@Perm");
      // API角色
      $router->post('/admin/api_role/list', "ApiRole@List");
      $router->post('/admin/api_role/add', "ApiRole@Add");
      $router->post('/admin/api_role/edit', "ApiRole@Edit");
      $router->post('/admin/api_role/del', "ApiRole@Del");
      $router->post('/admin/api_role/perm', "ApiRole@Perm");
      $router->post('/admin/api_role/permList', "ApiRole@PermList");
      $router->post('/admin/api_role/roleList', "ApiRole@RoleList");
      // 系统菜单
      $router->post('/admin/sys_menus/list', "SysMenus@List");
      $router->post('/admin/sys_menus/add', "SysMenus@Add");
      $router->post('/admin/sys_menus/edit', "SysMenus@Edit");
      $router->post('/admin/sys_menus/del', "SysMenus@Del");
      $router->post('/admin/sys_menus/perm', "SysMenus@Perm");
      $router->post('/admin/sys_menus/getMenusAll', "SysMenus@GetMenusAll");
      $router->post('/admin/sys_menus/getMenusPerm', "SysMenus@GetMenusPerm");
      // 系统角色
      $router->post('/admin/sys_role/list', "SysRole@List");
      $router->post('/admin/sys_role/add', "SysRole@Add");
      $router->post('/admin/sys_role/edit', "SysRole@Edit");
      $router->post('/admin/sys_role/del', "SysRole@Del");
      $router->post('/admin/sys_role/perm', "SysRole@Perm");
      $router->post('/admin/sys_role/permList', "SysRole@PermList");
      $router->post('/admin/sys_role/roleList', "SysRole@RoleList");
      // 新闻
      $router->post('/admin/news/list', "WebNews@List");
      $router->post('/admin/news/add', "WebNews@Add");
      $router->post('/admin/news/edit', "WebNews@Edit");
      $router->post('/admin/news/del', "WebNews@Del");
      $router->post('/admin/news/state', "WebNews@State");
      $router->post('/admin/news/get_class', "WebNews@GetClass");
      $router->post('/admin/news/get_content', "WebNews@GetContent");
      $router->post('/admin/news/content', "WebNews@Content");
      $router->post('/admin/news/up_img', "WebNews@UpImg");
      // 新闻分类
      $router->post('/admin/news_class/list', "WebNewsClass@List");
      $router->post('/admin/news_class/add', "WebNewsClass@Add");
      $router->post('/admin/news_class/edit', "WebNewsClass@Edit");
      $router->post('/admin/news_class/del', "WebNewsClass@Del");
      $router->post('/admin/news_class/state', "WebNewsClass@State");
    });
    
  }

}