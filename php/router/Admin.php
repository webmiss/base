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
      // 登录
      $router->post('/admin/user/login', "App\Admin\User@Login");
      $router->post('/admin/user/token', "App\Admin\User@Token");
    });
    
  }

}