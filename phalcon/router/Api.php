<?php
namespace Router;

class Api {
  static function Init($app){
    // 首页
    $app->get('/api','App\Api\Index::Index');
  }
}