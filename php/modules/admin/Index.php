<?php
namespace App\Admin;

use Service\Base;
use Model\Test;

class Index extends Base {

  /* 首页 */
  static function Index() {
    $m = new Test();
    $conn = $m->DBConn();
    self::Print($conn);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'Admin']);
  }

}
