<?php

namespace app\library;

use app\library\Inc;

class Wechat{

  static private $api_url = 'https://api.weixin.qq.com/';

  /* 消息推送验证 */
  static function msgValid(){
    $signature  = @$_GET['signature'];
    $timestamp  = @$_GET['timestamp'];
    $nonce  = @$_GET['nonce'];
    $echoStr = @$_GET["echostr"];
    // 加密
    $config = require APP_PATH.'/config/env.php';
    $tmpArr = [$config['wechat_token'], $timestamp, $nonce];
    sort($tmpArr, SORT_STRING);
    $tmpStr = implode($tmpArr);
    $tmpStr = sha1($tmpStr);
    return $tmpStr==$signature&&$echoStr?$echoStr:false;
  }

  /* 发送消息 */
  static function msgSend($token, $data){
    $res = Inc::curlPost(self::$api_url.'cgi-bin/message/custom/send?access_token='.$token,$data,'json');
    echo $res->errcode==0?'success':false;
  }

  /* 获取OpenID */
  static function getOpenid($code){
    $config = require APP_PATH.'/config/env.php';
    $res = file_get_contents(self::$api_url.'sns/jscode2session?appid='.$config['wechat_AppID'].'&secret='.$config['wechat_AppSecret'].'&js_code='.$code.'&grant_type=authorization_code');
    $res = json_decode($res);
    return isset($res->openid)?$res->openid:'';
  }
  
  /* AccessToken */
  static function getAccessToken(){
    $config = require APP_PATH.'/config/env.php';
    $res = file_get_contents(self::$api_url.'cgi-bin/token?grant_type=client_credential&appid='.$config['wechat_AppID'].'&secret='.$config['wechat_AppSecret']);
    $res = json_decode($res);
    return isset($res->access_token)?$res->access_token:'';
  }

  /* 小程序-支付参数 */
  static function getWappPay($prepay_id){
    $config = require APP_PATH.'/config/env.php';
    $data['appId'] = $config['wechat_AppID'];
    $data['timeStamp'] = (String)time();
    $data['nonceStr'] = md5(date('YmdHis'));
    $data['package'] = 'prepay_id='.$prepay_id;
    $data['signType'] = 'MD5';
    $data['paySign'] = self::getSign($data);
    return $data;
  }

  /* APP-支付参数 */
  static function getAppPay($prepay_id){
    $config = require APP_PATH.'/config/env.php';
    $data['appid'] = $config['wechat_AppID'];
    $data['partnerid'] = $config['wechat_MchID'];
    $data['prepayid'] = $prepay_id;
    $data['package'] = 'prepay_id=WXPay';
    $data['nonceStr'] = md5(date('YmdHis'));
    $data['timeStamp'] = (String)time();
    $data['sign'] = self::getSign($data);
    return $data;
  }

  /* 统一下单 */
  static function getUnifiedOrder($data=[]){
    $config = require APP_PATH.'/config/env.php';
    // 数据
    $data['appid'] = $config['wechat_AppID'];
    $data['mch_id'] = $config['wechat_MchID'];
    $data['nonce_str'] = md5(date('YmdHis'));
    // 签名
    $data['sign'] = self::getSign($data);
    // XML
    $xml = '<xml>';
    foreach($data as $key=>$val) $xml .= "<$key>$val</$key>";
    $xml .= '</xml>';
    // 请求
    $res = Inc::curlPost('https://api.mch.weixin.qq.com/pay/unifiedorder',$xml,'xml');
    $res = self::xml2array($res);
    return isset($res->prepay_id)?$res->prepay_id:$res;
  }

  /* 回调数据 */
  static function getNotify(){
    $data = file_get_contents('php://input');
    $data = self::xml2array($data);
    $tmpArr = (array)$data;
    unset($tmpArr['sign']);
    return $data->return_code=='SUCCESS'&&$data->result_code=='SUCCESS'&&$data->sign==Wechat::getSign($tmpArr)?$data:false;
  }

  /* 签名 */
  static function getSign($data){
    $config = require APP_PATH.'/config/env.php';
    $str = '';
    ksort($data);
    foreach($data as $key=>$val) $str .= $key.'='.$val.'&';
    $str .= 'key='.$config['wechat_Key'];
    return strtoupper(md5($str));
  }

  /* XML转数组 */
  static function xml2array($xml){
    return json_decode(json_encode(simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA)));
  }

}
