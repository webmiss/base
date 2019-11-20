<?php

namespace app\modules\api\controller;

use app\controller\Base;

/* token验证 */

class UserBase extends Base{

  // 用户信息
  static protected $token = '';

  function initialize(){
    // Token验证
    $token = trim($this->request->get('token'));
    if(strlen($token)<64) return self::error(1003);
    $res = self::verToken($token);
    if($res['code']!=0) return self::error(1001);
    self::$token = self::getToken($token);
  }

}
