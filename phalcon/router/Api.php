<?php
namespace Router;

class Api {
  static function Init($app){
    // 首页
    $app->get('/api','App\Api\Index::Index');
    // 登录
    $app->post('/api/user/login', 'App\Api\User::Login');
    $app->post('/api/user/token', 'App\Api\User::Token');
    // 权限
    $app->post('/api/demo/token', 'App\Api\Demo::Token');
    $app->post('/api/demo/list', 'App\Api\Demo::List');
    $app->post('/api/demo/perm', 'App\Api\Demo::Perm');
  }
}