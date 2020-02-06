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
    $res = self::verToken($token);
    if(!$res) return self::error(1001);
    self::$token = $res;
  }

}
