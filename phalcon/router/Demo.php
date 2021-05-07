<?php
namespace Router;

class Demo {
  static function Init($app){
    // 首页
    $app->get('/demo', 'App\Demo\Index::Index');
  }
}