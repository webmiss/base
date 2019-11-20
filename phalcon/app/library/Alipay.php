<?php

namespace app\library;

class Alipay{

  static $gatewayUrl = 'https://openapi.alipay.com/gateway.do';

  /* 支付参数 */
  static function getPay($type,$data,$notify_url=''){
    $config = require APP_PATH.'/config/env.php';
    $payData = [
      'app_id' => $config['alipay_appId'],
      'charset' => $config['alipay_charset'],
      'sign_type' => $config['alipay_signType'],
      'timestamp' => date('Y-m-d H:i:s'),
      'version' => $config['alipay_version'],
      'format' => 'JSON',
      'notify_url' => $notify_url,
    ];
    // 支付方式
    if($type=='app') $payData['method'] = 'alipay.trade.app.pay';
    elseif($type=='wap') $payData['method'] = 'alipay.trade.wap.pay';
    elseif($type=='web') $payData['method'] = 'alipay.trade.page.pay';
    // 业务参数
    $payData['biz_content'] = json_encode($data,JSON_UNESCAPED_UNICODE);
    // 签名
    $payData['sign'] = self::getSign($payData);
    return $payData;
  }

  /* 签名 */
  static function getSign($data){
    $config = require APP_PATH.'/config/env.php';
    $param = self::parameter($data);
    // 私钥
    $key = $config['alipay_rsaPrivateKey'];
    $key = chunk_split($key, 64, "\n");
    $key = "-----BEGIN RSA PRIVATE KEY-----\n$key-----END RSA PRIVATE KEY-----\n";
    // 生成
    if($config['alipay_signType']=='RSA2'){
      return openssl_sign($param, $sign, $key, OPENSSL_ALGO_SHA256)?base64_encode($sign):null;
    }elseif($config['alipay_signType']=='RSA'){
      return openssl_sign($param, $sign, $key, OPENSSL_ALGO_SHA1)?base64_encode($sign):null;
    }
  }

  /* 验证 */
  static function getVerify($data){
    $config = require APP_PATH.'/config/env.php';
    $param = self::parameter($data);
    // 支付宝公钥
    $key = $config['alipay_rsaPublicKey'];
    $key = chunk_split($key, 64, "\n");
    $key = "-----BEGIN PUBLIC KEY-----\n$key-----END PUBLIC KEY-----\n";
    // 生成
    if($config['alipay_signType']=='RSA2'){
      return (bool)openssl_verify($param, base64_decode($data['sign']), $key, OPENSSL_ALGO_SHA256);
    }elseif($config['alipay_signType']=='RSA'){
      return (bool)openssl_verify($param, base64_decode($data['sign']), $key, OPENSSL_ALGO_SHA1);
    }
  }

  /* 参数处理 */
  private static function parameter($data){
    $tmpData = [];
    // 去前后空格
    foreach($data as $key=>$val){
      $tmpData[trim($key)] = trim($val);
    }
    // 去空值
    $tmpData = array_filter($tmpData);
    // 剔除sign
    unset($tmpData['sign']);
    // 排序
    ksort($tmpData);
    // 编码
    $str = '';
    foreach($tmpData as $key=>$val) $str .= $key.'='.$val.'&';
    return rtrim($str,'&');
  }

}