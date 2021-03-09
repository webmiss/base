<?php
namespace Router;

class Admin {

  static function Init($app){
    // 首页
    $app->get('/admin', 'App\Admin\Index::Index');
    $app->post('/admin/index/getConfig', 'App\Admin\Index::GetConfig');
  }
}