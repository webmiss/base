<?php
namespace Config;

/* 允许跨域请求 */
class Cors{

  static function Init() {
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:*');
    header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
  }

}