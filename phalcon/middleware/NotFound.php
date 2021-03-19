<?php
namespace Middleware;

use Base\Base;

/* 允许跨域请求 */
class NotFound extends Base {

  static function Init() {
    return self::GetJSON(['code'=>404, 'msg'=>'Not Found']);
  }

}