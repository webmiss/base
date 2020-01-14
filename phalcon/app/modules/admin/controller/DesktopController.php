<?php

namespace app\modules\admin\controller;

use app\library\Centre;

/* 控制台 */
class DeskTopController extends UserBase{

  /* 首页 */
  function indexAction(){

    // 我的消息
    $msg = Centre::listMsg(self::$token->uid,0,3);
    if(!is_array($msg)) return self::getJSON(['code'=>4011,'msg'=>$msg]);

    // 统计
    $total = ['user'=>10, 'order'=>582, 'amount'=>3479.05, 'volume'=>85,];

    // 销量统计
    // $patient = Test::find([
    //   'state in ("1","2","3","4")',
    //   'columns'=>'date_format(ctime,"%m") month,count(ctime) num',
    //   'group'=>'month',
    //   'limit'=>12
    // ]);
    for($i=1;$i<=12;$i++) $data[] = (object)['month'=>str_pad($i,2,'0',STR_PAD_LEFT),'num'=>rand(20,90)];
    $day = self::getMonth();
    foreach($data as $val) if(isset($day[$val->month])) $day[$val->month]['y'] = $val->num;

    // 性别统计
    $gender[] = ['x'=>'男','y'=>54,'num'=>54];
    $gender[] = ['x'=>'女','y'=>46,'num'=>46];

    // 产品统计
    $room = [
      ['name'=>'PC电脑','num'=>120],
      ['name'=>'笔记本电脑','num'=>230],
    ];

    // 统计
    return self::getJSON([
      'code'=>0,
      'msg'=>$msg,
      'total'=>$total,
      'day'=>array_reverse(array_values($day)),
      'gender'=>$gender,
      'room'=>$room,
      'ratio'=>[
        's1'=>['num'=>259,'ratio'=>50],
        's2'=>['num'=>259,'ratio'=>18],
        's3'=>['num'=>2594,'ratio'=>60],
      ],
    ]);
  }

  /* 12个月 */
  private function getMonth(){
    $now = (Int)date('m');
    for($i=0; $i<12; $i++){
      $m = $now-$i;
      $val = $m>0?sprintf("%02d",$m):sprintf("%02d",12+$m);
      $day[$val] = ['x'=>(Int)$val.'月','y'=>0];
    }
    return $day;
  }

}