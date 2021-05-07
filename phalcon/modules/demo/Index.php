<?php
namespace App\Demo;

use Service\Base;
use Library\Tencent\Im;

class Index extends Base {

  /* 首页 */
  static function Index() {
    $userSig = Im::UserSig(123456);
    $res = Im::VerifySig(123456, $userSig);
    self::Print($res);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'Demo']);
  }

}