<?php
namespace App\Api;

use Base\Base;

class Index extends Base {

  /* 首页 */
  static function Index() {
    return self::GetJSON(['code'=>0, 'msg'=>'Api']);
  }

}
