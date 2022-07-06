<?php
namespace Router;

class Api {
  static function Init($app){
    // 首页
    $app->get('/api','App\Api\Index::Index');
    // 登录
    $app->post('/api/user/login', 'App\Api\User::Login');
    $app->post('/api/user/token', 'App\Api\User::Token');
  }
}