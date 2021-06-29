<?php
namespace App\Admin;

use Service\Base;
use Service\Data;
use Service\AdminToken;
use Config\Env;
use Model\SysConfig;
use Model\Logs;
use Util\Util;

class Index extends Base {

  /* 首页 */
  static function Index() {
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'Admin']);
  }

  /* 系统配置 */
  static function GetConfig() {
    $config = new SysConfig();
    $config->Columns('name','val');
    $config->Where('name in ("title","copy","logo","login_bg")');
    $data = $config->Find();
    // 数据
    $list = [];
    foreach($data as $val){
      if($val['name']=='logo' || $val['name']=='login_bg'){
        $list[$val['name']] = Data::Img($val['val']);
      }else{
        $list[$val['name']] = $val['val'];
      }
    }
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功', 'list'=>$list]);
  }

  /* 图表数据 */
  static function GetChart() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    // 验证
    $msg = AdminToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 统计图1
    $chart1 = [];
    $day = date('Y-m-d');
    $last1 = date('Y-m-d', strtotime('1 day'));
    $last2 = date('Y-m-d', strtotime('-1 day'));
    for($i=0; $i<24; $i++) {
      // 时间
      if($i==23){
        $dt1 = $day.' '. $i .':00:00';
        $dt2 = $last1 . '00:00:00';
        $dt3 = $last2 . ' ' . $i . ':00:00';
        $dt4 = $day . ' 00:00:00';
      } else {
        $dt1 = $day . ' ' . $i . ':00:00';
        $dt2 = $day . ' ' . ($i+1) . ':00:00';
        $dt3 = $last2 . ' ' . $i . ':00:00';
        $dt4 = $last2 . ' ' . ($i+1) . ':00:00';
      }
      $t1 = Util::Strtotime($dt1);
      $t2 = Util::Strtotime($dt2);
      $t3 = Util::Strtotime($dt3);
      $t4 = Util::Strtotime($dt4);
      // 统计
      $m1 = new Logs();
      $m1->Columns('count(*) as total');
      $m1->Where('ctime>=? AND ctime<? AND source=?', $t1, $t2, Env::$log_source);
      $d1 = $m1->FindFirst();
      $chart1[] = ['type'=>'今日(PV)', 'label'=>(string)$i, 'value'=>(int)$d1['total']];
      $m2 = new Logs();
      $m2->Columns('count(*) as total');
      $m2->Where('ctime>=? AND ctime<? AND source=?', $t3, $t4, Env::$log_source);
      $d2 = $m2->FindFirst();
      $chart1[] = ['type'=>'昨日(PV)', 'label'=>(string)$i, 'value'=>(int)$d2['total']];
    }
    // 统计图2
    $chart2 = [];
    $year = date('Y');
    $last1 = strval($year+1);
    $last2 = strval($year-1);
    for($i=0; $i<12; $i++) {
      // 时间
      if($i==11){
        $dt1 = $year . '-' . ($i+1) . '-01';
        $dt2 = $last1 . '-01-01';
        $dt3 = $last2.'-' . ($i+1) . '-01';
        $dt4 = $year . '-01-01';
      } else {
        $dt1 = $year . '-' . ($i+1) . '-01';
        $dt2 = $year . '-' . ($i+2) . '-01';
        $dt3 = $last2 . '-' . ($i+1) . '-01';
        $dt4 = $last2 . '-' . ($i+2) . '-01';
      }
      $t1 = Util::Strtotime($dt1);
      $t2 = Util::Strtotime($dt2);
      $t3 = Util::Strtotime($dt3);
      $t4 = Util::Strtotime($dt4);
      // 统计
      $m1 = new Logs();
      $m1->Columns('count(*) as total');
      $m1->Where('ctime>=? AND ctime<? AND source=?', $t1, $t2, Env::$log_source);
      $d1 = $m1->FindFirst();
      $chart2[] = ['type'=>'今年(PV)', 'label'=>(string)($i+1), 'value'=>(int)$d1['total']];
      $m2 = new Logs();
      $m2->Columns('count(*) as total');
      $m2->Where('ctime>=? AND ctime<? AND source=?', $t3, $t4, Env::$log_source);
      $d2 = $m2->FindFirst();
      $chart2[] = ['type'=>$last2.'年(PV)', 'label'=>(string)($i+1), 'value'=>(int)$d2['total']];
    }
    // 统计图3
    $chart3 = [];
    $m1 = new Logs();
    $m1->Columns('count(*) as total');
    $m1->Where('source=?', Env::$log_source);
    $d1 = $m1->FindFirst();
    $m2 = new Logs();
    $m2->Columns('count(*) as total', 'browser');
    $m2->Where('source=?', Env::$log_source);
    $m2->Group('browser');
    $d2 = $m2->Find();
    foreach($d2 as $val) {
      $ratio = intval($val['total']/$d1['total']*100)/100;
      $chart3[] = ['label'=>$val['browser'], 'value'=>$ratio];
    }
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功', 'chart1'=>$chart1, 'chart2'=>$chart2, 'chart3'=>$chart3]);
  }

}
