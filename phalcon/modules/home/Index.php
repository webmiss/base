<?php
namespace app\home;

use Base\Base;
use Model\Demo;

class Index extends Base {

  /* 首页 */
  static function Index() {
    // 查询
    $demo = new Demo();
    $demo->Columns('uid','title');
    $demo->Where('title LIKE ?','%事务%');
    list($sql, $args) = $demo->SelectSql();
    $query = $demo->Query($sql, $args);
    $data = $query->fetchAll();
    // 添加
    // $demo->Values(['uid'=>null,'title'=>'添加']);
    // $demo->Insert();
    return self::getJSON(['code'=>0, 'msg'=>'Web', 'data'=>$data]);
  }

}
