<?php

namespace app\modules\api\controller;

use app\controller\Base;

class UserBase extends Base{

  // 用户信息
  static protected $token = '';

  function initialize(){
    // Token验证
    $token = trim($this->request->get('token'));
    $res = self::verToken($token);
    if(!$res) return self::error(1000);
    self::$token = $res;
  }

}
