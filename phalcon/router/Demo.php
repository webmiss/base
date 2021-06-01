<?php
namespace Router;

class Demo {
  static function Init($app){
    // 首页
    $app->get('/demo', 'App\Demo\Index::Index');
    // TinyMCE
    $app->post('/demo/tinymce/edit', 'App\Demo\Tinymce::Edit');
    $app->post('/demo/tinymce/upImg', 'App\Demo\Tinymce::UpImg');
    // TWebLive
    $app->post('/demo/tweblive/list', 'App\Demo\Tweblive::List');
    $app->post('/demo/tweblive/userInfo', 'App\Demo\Tweblive::UserInfo');
  }
}