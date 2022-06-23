<?php
namespace Router;

use Illuminate\Container\Container;
use Middleware\Cors;

class Api {

  static function Init(){
    // 允许跨域请求
    Cors::Init();
    // 路由
    $app = Container::getInstance();
    $app['router']->group(['namespace'=>'App\Api', 'middleware'>['Middleware\Cors@Init']], function($router){
      // 首页
      $router->get('/api', "Index@Index");
      // 登录
      $router->get('/api/user/login', "User@Login");
      $router->get('/api/user/token', "User@Token");
    });
    
  }

}