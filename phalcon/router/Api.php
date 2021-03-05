<?php
namespace router;

use App\Api\Index;

class Api {
  static function Init($app){
    // 首页
    $app->get('/api',function(){ return Index::Index(); });
  }
}