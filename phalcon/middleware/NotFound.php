<?php
namespace Middleware;

use Middleware\Cors;
use Service\Base;

/* 允许跨域请求 */
class NotFound extends Base {

  static function Init() {
    Cors::Init();
    return self::GetJSON(['code'=>404, 'msg'=>'Not Found']);
  }

}