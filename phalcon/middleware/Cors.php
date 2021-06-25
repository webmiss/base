<?php
namespace Middleware;

/* 允许跨域请求 */
class Cors{

  static function Init() {
    header('Access-Control-Allow-Origin: *');   //域名
    header('Access-Control-Allow-Methods: *');  //请求方式
    header('Access-Control-Allow-Headers: x-requested-with,content-type');  //预检响应
    header('Access-Control-Max-Age: 2592000');  //OPTIONS(30天)
  }

}