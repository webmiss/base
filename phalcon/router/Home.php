<?php
namespace router;

use App\Home\Index;

class Home {
  static function Init($app){
    // 首页
    $app->get('/',function(){ return Index::Index(); });
  }
}