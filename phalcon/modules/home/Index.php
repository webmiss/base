<?php
namespace app\home;

use Base\Base;
use Model\User;

class Index extends Base {

  /* 首页 */
  static function Index() {
    $demo = new User();
    $demo->Columns('uid','title');
    $demo->Where('title LIKE ?','%事物%');
    $data = $demo->Find();
    self::print($data);
    // list($sql, $args) = $demo->SelectSql();
    // self::print($sql, $args);
    return self::getJSON(['code'=>0, 'msg'=>'Web']);
  }

}
