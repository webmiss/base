<?php
namespace App\Home;

use Service\Base;

class Index extends Base {

  /* 首页 */
  static function Index() {
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'Web']);
  }

}
