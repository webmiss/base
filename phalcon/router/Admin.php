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
    $app->post('/admin/sysfile/list', 'App\Admin\SysFile::List');
    $app->post('/admin/sysfile/mkdir', 'App\Admin\SysFile::Mkdir');
    $app->post('/admin/sysfile/rename', 'App\Admin\SysFile::Rename');
    $app->post('/admin/sysfile/upload', 'App\Admin\SysFile::Upload');
    $app->post('/admin/sysfile/down', 'App\Admin\SysFile::Down');
    $app->post('/admin/sysfile/remove', 'App\Admin\SysFile::Remove');
    // 用户管理
    $app->post('/admin/sys_user/list', 'App\Admin\SysUser::List');
    $app->post('/admin/sys_user/add', 'App\Admin\SysUser::Add');
    $app->post('/admin/sys_user/edit', 'App\Admin\SysUser::Edit');
    $app->post('/admin/sys_user/del', 'App\Admin\SysUser::Del');
    $app->post('/admin/sys_user/state', 'App\Admin\SysUser::State');
    $app->post('/admin/sys_user/perm', 'App\Admin\SysUser::Perm');
    $app->post('/admin/sys_user/info', 'App\Admin\SysUser::Info');
    // API菜单
    $app->post('/admin/apimenus/list', 'App\Admin\ApiMenus::List');
    $app->post('/admin/apimenus/add', 'App\Admin\ApiMenus::Add');
    $app->post('/admin/apimenus/edit', 'App\Admin\ApiMenus::Edit');
    $app->post('/admin/apimenus/del', 'App\Admin\ApiMenus::Del');
    $app->post('/admin/apimenus/perm', 'App\Admin\ApiMenus::Perm');
    // API角色
    $app->post('/admin/apirole/list', 'App\Admin\ApiRole::List');
    $app->post('/admin/apirole/add', 'App\Admin\ApiRole::Add');
    $app->post('/admin/apirole/edit', 'App\Admin\ApiRole::Edit');
    $app->post('/admin/apirole/del', 'App\Admin\ApiRole::Del');
    $app->post('/admin/apirole/perm', 'App\Admin\ApiRole::Perm');
    $app->post('/admin/apirole/permList', 'App\Admin\ApiRole::PermList');
    $app->post('/admin/apirole/roleList', 'App\Admin\ApiRole::RoleList');
    // 系统菜单
    $app->post('/admin/sys_menus/list', 'App\Admin\SysMenus::List');
    $app->post('/admin/sys_menus/add', 'App\Admin\SysMenus::Add');
    $app->post('/admin/sys_menus/edit', 'App\Admin\SysMenus::Edit');
    $app->post('/admin/sys_menus/del', 'App\Admin\SysMenus::Del');
    $app->post('/admin/sys_menus/perm', 'App\Admin\SysMenus::Perm');
    $app->post('/admin/sys_menus/getMenus', 'App\Admin\SysMenus::GetMenus');
    // 系统角色
    $app->post('/admin/sys_role/list', 'App\Admin\SysRole::List');
    $app->post('/admin/sys_role/add', 'App\Admin\SysRole::Add');
    $app->post('/admin/sys_role/edit', 'App\Admin\SysRole::Edit');
    $app->post('/admin/sys_role/del', 'App\Admin\SysRole::Del');
    $app->post('/admin/sys_role/perm', 'App\Admin\SysRole::Perm');
    $app->post('/admin/sys_role/permList', 'App\Admin\SysRole::PermList');
    $app->post('/admin/sys_role/roleList', 'App\Admin\SysRole::RoleList');
    // 系统配置
    $app->post('/admin/sysconfig/list', 'App\Admin\SysConfig::List');
    $app->post('/admin/sysconfig/edit', 'App\Admin\SysConfig::Edit');
    $app->post('/admin/sysconfig/upimg', 'App\Admin\SysConfig::Upimg');
  }

}