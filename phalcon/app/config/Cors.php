<?php
namespace app\config;

/* 跨域请求 */
class Cors{

  /* 允许模块 */
  static function corsAllowe(){
    return ['admin','api'];
  }

}