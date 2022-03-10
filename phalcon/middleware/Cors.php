<?php
namespace Middleware;

/* 允许跨域请求 */
class Cors{

  static function Init() {
    header('Access-Control-Allow-Origin: *');   //域名
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');  //请求方式
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');  //预检响应
    header('Access-Control-Max-Age: 2592000');  //OPTIONS(30天)
    if($_SERVER['REQUEST_METHOD']=='OPTIONS')  exit;
  }

}