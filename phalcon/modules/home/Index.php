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
    $data = $demo->Find();
    // 添加
    $demo->Values(['uid'=>null,'title'=>'PHP-添加']);
    $id = $demo->Insert();
    self::Print($id);
    // 更新
    $demo->Set(['title'=>'PHP-更新']);
    $demo->Where('uid=?', $id);
    $num = $demo->Update();
    self::Print($num);
    // 删除
    $demo->Where('uid=?', $id);
    $num = $demo->Delete();
    self::Print($num);
    return self::GetJSON(['code'=>0, 'msg'=>'Web', 'data'=>$data]);
  }

}
