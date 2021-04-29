<?php
namespace Router;

class Admin {

  static function Init($app){
    // 首页
    $app->get('/admin', 'App\Admin\Index::Index');
    $app->post('/admin/index/getConfig', 'App\Admin\Index::GetConfig');
    // 登录
    $app->post('/admin/user/login', 'App\Admin\User::Login');
    $app->post('/admin/user/token', 'App\Admin\User::Token');
    // 个人资料
    $app->post('/admin/userinfo/list', 'App\Admin\UserInfo::List');
    $app->post('/admin/userinfo/edit', 'App\Admin\UserInfo::Edit');
    $app->post('/admin/userinfo/upimg', 'App\Admin\UserInfo::Upimg');
    // 修改密码
    $app->post('/admin/userpasswd/edit', 'App\Admin\UserPasswd::Edit');
    // 文件管理
    $app->post('/admin/sysfile/list', 'App\Admin\SysFile::List');
    $app->post('/admin/sysfile/mkdir', 'App\Admin\SysFile::Mkdir');
    $app->post('/admin/sysfile/rename', 'App\Admin\SysFile::Rename');
    $app->post('/admin/sysfile/upload', 'App\Admin\SysFile::Upload');
    $app->post('/admin/sysfile/down', 'App\Admin\SysFile::Down');
    $app->post('/admin/sysfile/remove', 'App\Admin\SysFile::Remove');
    // 用户管理
    $app->post('/admin/sysuser/list', 'App\Admin\SysUser::List');
    $app->post('/admin/sysuser/add', 'App\Admin\SysUser::Add');
    $app->post('/admin/sysuser/edit', 'App\Admin\SysUser::Edit');
    $app->post('/admin/sysuser/del', 'App\Admin\SysUser::Del');
    $app->post('/admin/sysuser/state', 'App\Admin\SysUser::State');
    $app->post('/admin/sysuser/info', 'App\Admin\SysUser::Info');
    // 会员菜单
    $app->post('/admin/apimenus/list', 'App\Admin\ApiMenus::List');
    $app->post('/admin/apimenus/add', 'App\Admin\ApiMenus::Add');
    $app->post('/admin/apimenus/edit', 'App\Admin\ApiMenus::Edit');
    $app->post('/admin/apimenus/del', 'App\Admin\ApiMenus::Del');
    // 会员角色
    $app->post('/admin/apirole/list', 'App\Admin\ApiRole::List');
    $app->post('/admin/apirole/add', 'App\Admin\ApiRole::Add');
    $app->post('/admin/apirole/edit', 'App\Admin\ApiRole::Edit');
    $app->post('/admin/apirole/del', 'App\Admin\ApiRole::Del');
    // 系统菜单
    $app->post('/admin/sysmenus/list', 'App\Admin\SysMenus::List');
    $app->post('/admin/sysmenus/add', 'App\Admin\SysMenus::Add');
    $app->post('/admin/sysmenus/edit', 'App\Admin\SysMenus::Edit');
    $app->post('/admin/sysmenus/del', 'App\Admin\SysMenus::Del');
    $app->post('/admin/sysmenus/getMenus', 'App\Admin\SysMenus::GetMenus');
    // 系统角色
    $app->post('/admin/sysrole/list', 'App\Admin\SysRole::List');
    $app->post('/admin/sysrole/add', 'App\Admin\SysRole::Add');
    $app->post('/admin/sysrole/edit', 'App\Admin\SysRole::Edit');
    $app->post('/admin/sysrole/del', 'App\Admin\SysRole::Del');
    // 系统配置
    $app->post('/admin/sysconfig/list', 'App\Admin\SysConfig::List');
    $app->post('/admin/sysconfig/edit', 'App\Admin\SysConfig::Edit');
    $app->post('/admin/sysconfig/upimg', 'App\Admin\SysConfig::Upimg');
  }

}