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
    // 系统菜单
    $app->post('/admin/Sysmenus/getMenus', 'App\Admin\SysMenus::GetMenus');
  }
}