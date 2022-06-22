<?php
namespace App\Admin;

use Service\Base;

class User extends Base {

  /* 登录 */
  static function Login() {
    // 返回
    return self::GetJSON(['code'=>10, 'msg'=>'成功']);
  }

  /* Token验证 */
  static function Token() {
    // 返回
    return self::GetJSON(['code'=>10, 'msg'=>'成功']);
  }

}
