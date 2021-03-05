<?php
namespace app\admin;

use Base\Base;

class Index extends Base {

  /* 首页 */
  static function Index() {
    return self::getJSON(['code'=>0, 'msg'=>'Admin']);
  }

}
