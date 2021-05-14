<?php
namespace Router;

class Demo {
  static function Init($app){
    // 首页
    $app->get('/demo', 'App\Demo\Index::Index');
    // TinyMCE
    $app->post('/demo/tinymce/edit', 'App\Demo\Tinymce::Edit');
    $app->post('/demo/tinymce/upImg', 'App\Demo\Tinymce::UpImg');
  }
}