<?php
namespace App\Admin;

use Service\Base;
use Service\AdminToken;
use Library\Baidu\TongJi;
use Util\Util;


class Index extends Base {

  static private $site_id = '17669804';

  /* 首页 */
  static function Index() {
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'PHP Admin']);
  }

  /* 图表数据 */
  static function GetChart() {
    $day = Util::DateFormat('Ymd');
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    // 验证
    $msg = AdminToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);

    // 今日流量
    $sDate = Util::DateFormat('Ymd', '-1d');
    $eDate = $day;
    $res = TongJi::TrendRpt([
      'site_id'=>self::$site_id,
      'start_date'=>$sDate,
      'end_date'=>$eDate,
      'metrics'=>'pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time'
    ]);
    $t1 = $res->items[1][1];
    $t2 = $res->items[1][0];
    $data['TrendRpt'] = [
      'today'=>[
        'day'=>$res->items[0][1][0],
        'pv'=>$t1[0]!='--'?$t1[0]:'0',
        'uv'=>$t1[1]!='--'?$t1[1]:'0',
        'ip'=>$t1[2]!='--'?$t1[2]:'0',
        'ratio'=>$t1[3]!='--'?$t1[3]:'0',
        'time'=>$t1[4]!='--'?$t1[4]:'0',
      ],
      'yesterday'=>[
        'day'=>$res->items[0][0][0],
        'pv'=>$t2[0]!='--'?$t2[0]:'0',
        'uv'=>$t2[1]!='--'?$t2[1]:'0',
        'ip'=>$t2[2]!='--'?$t2[2]:'0',
        'ratio'=>$t2[3]!='--'?$t2[3]:'0',
        'time'=>$t2[4]!='--'?$t2[4]:'0',
      ],
    ];

    /* 趋势分析 */
    $tp = self::JsonName($json, 'type');
    $gran = 'day';
    if($tp=='t1'){
      $gran = 'hour';
      $sDate = $day;
    }elseif($tp=='t2'){
      $gran = 'hour';
      $sDate = Util::DateFormat('Ymd', '-1d');
      $eDate = $sDate;
    }elseif($tp=='t3'){
      $sDate = Util::DateFormat('Ymd', '-6d');
      $eDate = $day;
    }elseif($tp=='t4'){
      $sDate = Util::DateFormat('Ymd', '-29d');
      $eDate = $day;
    }
    $res = TongJi::Trend([
      'site_id'=>self::$site_id,
      'start_date'=>$sDate,
      'end_date'=>$eDate,
      'metrics'=>'pv_count,visitor_count,ip_count',
      'gran'=>$gran,
    ]);
    // 数据
    $trend = [];
    $n = Util::Len($res->items[0])-1;
    for($i=$n; $i>=0; $i--){
      if($tp=='t1'||$tp=='t2'){
        $label = ($n-$i).'点';
      }else{
        $label = $res->items[0][$i][0];
      }
      // 浏览量(PV)
      $value = $res->items[1][$i][0]=='--'?0:$res->items[1][$i][0];
      $trend[]=['type'=>'浏览量(PV)', 'label'=>$label, 'value'=>$value];
      // 访客数(UV)
      $value = $res->items[1][$i][1]=='--'?0:$res->items[1][$i][1];
      $trend[]=['type'=>'访客数(UV)', 'label'=>$label, 'value'=>$value];
      // IP数
      $value = $res->items[1][$i][2]=='--'?0:$res->items[1][$i][2];
      $trend[]=['type'=>'IP数', 'label'=>$label, 'value'=>$value];
      
    }
    $data['Trend'] = $trend;

    /* 返回 */
    return self::GetJSON(['code'=>0, 'msg'=>'成功', 'data'=>$data]);
  }

}
