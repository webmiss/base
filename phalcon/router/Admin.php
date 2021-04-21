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
    // 系统菜单
    $app->post('/admin/sysmenus/getMenus', 'App\Admin\SysMenus::GetMenus');
  }

}