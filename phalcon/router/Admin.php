<?php
namespace Router;

class Admin {

  static function Init($app){
    // 首页
    $app->get('/admin', 'App\Admin\Index::Index');
    $app->get('/admin/index/getConfig', 'App\Admin\Index::GetConfig');
    $app->post('/admin/index/getChart', 'App\Admin\Index::GetChart');
    // 登录
    $app->post('/admin/user/login', 'App\Admin\User::Login');
    $app->post('/admin/user/token', 'App\Admin\User::Token');
    // 个人资料
    $app->post('/admin/user_info/list', 'App\Admin\UserInfo::List');
    $app->post('/admin/user_info/edit', 'App\Admin\UserInfo::Edit');
    $app->post('/admin/user_info/upimg', 'App\Admin\UserInfo::Upimg');
    // 修改密码
    $app->post('/admin/user_passwd/edit', 'App\Admin\UserPasswd::Edit');
    // 文件管理
    $app->post('/admin/sys_file/list', 'App\Admin\SysFile::List');
    $app->post('/admin/sys_file/mkdir', 'App\Admin\SysFile::Mkdir');
    $app->post('/admin/sys_file/rename', 'App\Admin\SysFile::Rename');
    $app->post('/admin/sys_file/upload', 'App\Admin\SysFile::Upload');
    $app->post('/admin/sys_file/down', 'App\Admin\SysFile::Down');
    $app->post('/admin/sys_file/remove', 'App\Admin\SysFile::Remove');
    // 用户管理
    $app->post('/admin/sys_user/list', 'App\Admin\SysUser::List');
    $app->post('/admin/sys_user/add', 'App\Admin\SysUser::Add');
    $app->post('/admin/sys_user/edit', 'App\Admin\SysUser::Edit');
    $app->post('/admin/sys_user/del', 'App\Admin\SysUser::Del');
    $app->post('/admin/sys_user/state', 'App\Admin\SysUser::State');
    $app->post('/admin/sys_user/perm', 'App\Admin\SysUser::Perm');
    $app->post('/admin/sys_user/info', 'App\Admin\SysUser::Info');
    // API菜单
    $app->post('/admin/api_menus/list', 'App\Admin\ApiMenus::List');
    $app->post('/admin/api_menus/add', 'App\Admin\ApiMenus::Add');
    $app->post('/admin/api_menus/edit', 'App\Admin\ApiMenus::Edit');
    $app->post('/admin/api_menus/del', 'App\Admin\ApiMenus::Del');
    $app->post('/admin/api_menus/perm', 'App\Admin\ApiMenus::Perm');
    // API角色
    $app->post('/admin/api_role/list', 'App\Admin\ApiRole::List');
    $app->post('/admin/api_role/add', 'App\Admin\ApiRole::Add');
    $app->post('/admin/api_role/edit', 'App\Admin\ApiRole::Edit');
    $app->post('/admin/api_role/del', 'App\Admin\ApiRole::Del');
    $app->post('/admin/api_role/perm', 'App\Admin\ApiRole::Perm');
    $app->post('/admin/api_role/permList', 'App\Admin\ApiRole::PermList');
    $app->post('/admin/api_role/roleList', 'App\Admin\ApiRole::RoleList');
    // 系统菜单
    $app->post('/admin/sys_menus/list', 'App\Admin\SysMenus::List');
    $app->post('/admin/sys_menus/add', 'App\Admin\SysMenus::Add');
    $app->post('/admin/sys_menus/edit', 'App\Admin\SysMenus::Edit');
    $app->post('/admin/sys_menus/del', 'App\Admin\SysMenus::Del');
    $app->post('/admin/sys_menus/perm', 'App\Admin\SysMenus::Perm');
    $app->post('/admin/sys_menus/getMenusAll', 'App\Admin\SysMenus::GetMenusAll');
    $app->post('/admin/sys_menus/getMenusPerm', 'App\Admin\SysMenus::GetMenusPerm');
    // 系统角色
    $app->post('/admin/sys_role/list', 'App\Admin\SysRole::List');
    $app->post('/admin/sys_role/add', 'App\Admin\SysRole::Add');
    $app->post('/admin/sys_role/edit', 'App\Admin\SysRole::Edit');
    $app->post('/admin/sys_role/del', 'App\Admin\SysRole::Del');
    $app->post('/admin/sys_role/perm', 'App\Admin\SysRole::Perm');
    $app->post('/admin/sys_role/permList', 'App\Admin\SysRole::PermList');
    $app->post('/admin/sys_role/roleList', 'App\Admin\SysRole::RoleList');
    // 新闻
    $app->post('/admin/news/list', 'App\Admin\WebNews::List');
    $app->post('/admin/news/add', 'App\Admin\WebNews::Add');
    $app->post('/admin/news/edit', 'App\Admin\WebNews::Edit');
    $app->post('/admin/news/del', 'App\Admin\WebNews::Del');
    $app->post('/admin/news/state', 'App\Admin\WebNews::State');
    $app->post('/admin/news/get_class', 'App\Admin\WebNews::GetClass');
    $app->post('/admin/news/get_content', 'App\Admin\WebNews::GetContent');
    $app->post('/admin/news/content', 'App\Admin\WebNews::Content');
    $app->post('/admin/news/up_img', 'App\Admin\WebNews::UpImg');
    // 新闻-分类
    $app->post('/admin/news_class/list', 'App\Admin\WebNewsClass::List');
    $app->post('/admin/news_class/add', 'App\Admin\WebNewsClass::Add');
    $app->post('/admin/news_class/edit', 'App\Admin\WebNewsClass::Edit');
    $app->post('/admin/news_class/del', 'App\Admin\WebNewsClass::Del');
    $app->post('/admin/news_class/state', 'App\Admin\WebNewsClass::State');
  }

}