<?php
namespace app\home;

use Base\Base;
use Model\User;

class Index extends Base {

  /* 首页 */
  static function Index() {
    // 查询
    $demo = new User();
    $demo->Columns('uid','title');
    $demo->Where('title LIKE ?','%事务%');
    $data = $demo->FindFirst();
    // 添加
    $demo->Values(['uid'=>null,'title'=>'添加']);
    $demo->Insert();
    return self::getJSON(['code'=>0, 'msg'=>'Web', 'data'=>$data]);
  }

}
