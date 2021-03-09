<?php
namespace router;

use App\Admin\Index;

class Admin {
  static function Init($app){
    // 首页
    $app->get('/admin', function(){ return Index::Index(); });
    $app->post('/admin/index/getConfig', function(){ return Index::getConfig(); });
  }
}