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
      $router->get('/vcode', "Index@Vcode");
      $router->get('/index/qrcode/{name}', "Index@Qrcode");
      // 回调
      $router->post('/oss_callback', "Index@OssCallback");
      // YouTube
      $router->get('/youtube', "Index@YouTubeToken");
      $router->get('/youtube/oauth', "Index@YouTubeOauth");
      $router->get('/youtube/send', "Index@YouTubeMessage");
    });
    
  }

}