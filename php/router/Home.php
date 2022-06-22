<?php
namespace Router;

use Illuminate\Container\Container;
use Middleware\Cors;

class Home {

  static function Init(){
    // 允许跨域请求
    Cors::Init();
    // 路由
    $app = Container::getInstance();
    $app['router']->group(['namespace'=>'App\Home', 'middleware'>['Middleware\Cors@Init']], function($router){
      // 首页
      $router->get('/', "Index@Index");
    });
    
  }

}