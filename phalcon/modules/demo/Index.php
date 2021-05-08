<?php
namespace App\Demo;

use Service\Base;

class Index extends Base {

  /* 首页 */
  static function Index() {
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'Demo']);
  }

}