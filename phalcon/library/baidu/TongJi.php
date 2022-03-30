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

  /* 站点列表 */
  static function SiteList() {
    $dataStr = self::GetData();
    $res = Curl::Request('POST', self::$Url.'ReportService/getSiteList', $dataStr);
    return self::Result($res);
  }

  /* 网站概况-趋势数据 */
  static function TrendRpt(string $site_id, string $start_date, string $end_date, string $metrics='') {
    $body = [
      'site_id'=> $site_id,
      'start_date'=> $start_date,
      'end_date'=> $end_date,
      'method'=> 'overview/getTimeTrendRpt',
      'metrics'=> $metrics,
    ];
    $dataStr = self::GetData($body);
    $res = Curl::Request('POST', self::$Url.'ReportService/getData', $dataStr);
    return self::Result($res);
  }

  /* 结果 */
  static private function Result($res) {
    $data = $res->body->data;
    $res = [];
    if(Util::Len($data)>0 && $data[0]->result) $res = $data[0]->result;
    return $res;
  }

}