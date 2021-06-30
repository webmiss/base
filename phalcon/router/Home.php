<?php
namespace Router;

class Home {
  static function Init($app){
    // 首页
    $app->get('/', 'App\Home\Index::Index');
    $app->get('/vcode', 'App\Home\Index::Vcode');
    $app->get('/index/qrcode/{name}', 'App\Home\Index::Qrcode');
    $app->post('/ossCallback', 'App\Home\Index::OssCallback');
  }
}