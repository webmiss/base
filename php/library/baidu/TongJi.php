<?php
namespace Library\Baidu;

use Service\Base;
use Config\Baidu;
use Library\Curl;
use Util\Util;

/* 百度统计 */
class TongJi extends Base {

  static private $Url = 'https://api.baidu.com/json/tongji/v1/';
  
  /* 公共配置 */
  static function GetData(array $body=[]): string {
    $cfg = Baidu::TongJi();
    $json = [
      'header'=> [
        'username'=>$cfg['UserName'],
        'password'=>$cfg['PassWord'],
        'token'=>$cfg['Token'],
        'account_type'=>$cfg['AccountType'],
      ],
    ];
    if(!empty($body)) $json['body']=$body;
    return Util::JsonEncode($json);
  }

  /* 返回结果 */
  static private function result($res) {
    $data = $res->body->data;
    $res = [];
    if(Util::Len($data)>0 && $data[0]->result) return $data[0]->result;
    return $res;
  }

  /* 站点列表 */
  static function SiteList() {
    $dataStr = self::GetData();
    $res = Curl::Request(self::$Url.'ReportService/getSiteList', $dataStr, 'POST');
    return self::result($res);
  }

  /* 网站概况-趋势数据 */
  static function TrendRpt(array $params=[]) {
    // 参数
    $param = array_merge([
      'method'=>'overview/getTimeTrendRpt',
      'site_id'=>'',              //应用ID
      'start_date'=>'',           //开始日期
      'end_date'=>'',             //结束日期
      'metrics'=>'pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count',
    ],$params);
    // 请求
    $dataStr = self::GetData($param);
    $res = Curl::Request(self::$Url.'ReportService/getData', $dataStr, 'POST');
    return self::result($res);
  }

  /* 趋势分析 */
  static function Trend(array $params=[]) {
    // 参数
    $param = array_merge([
      'method'=>'trend/time/a',
      'site_id'=>'',              //应用ID
      'start_date'=>'',           //开始日期
      'end_date'=>'',             //结束日期
      'metrics'=>'pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio,avg_trans_cost,income',
      'gran'=>'default',          //时间粒度: default/hour/day/week/month/year
      'source'=>'all',            //来源: all/through/search,0/link/
      'clientDevice'=>'all',      //设备: all/pc/mobile
      'area'=>'all',              //地域: all/china/province,1/province,4,90/other
      'visitor'=>'all',           //访客: all/new/old
    ],$params);
    // 请求
    $dataStr = self::GetData($param);
    $res = Curl::Request(self::$Url.'ReportService/getData', $dataStr, 'POST');
    return self::result($res);
  }

}