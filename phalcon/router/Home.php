<?php
namespace Router;

use App\Home\Index;

class Home {
  static function Init($app){
    // 首页
    $app->get('/',function(){ return Index::Index(); });
    $app->get('/index/qrcode/{name}',function($name){ return Index::qrcode($name); });
  }
}