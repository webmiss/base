<?php

namespace app\library;

class Alipay{

  static $gatewayUrl = 'https://openapi.alipay.com/gateway.do';

  /* 支付参数 */
  static function getPay($type,$data,$notify_url=''){
    $config = require APP_PATH.'/config/env.php';
    // 证书方式
    $payData['app_cert_sn'] = self::getCertSN($config['alipay_appCertSn']);
    $payData['alipay_root_cert_sn'] = self::getRootCertSN($config['alipay_rootCertSn']);
    // 公共参数
    $payData['app_id'] = $config['alipay_appId'];
    $payData['charset'] = $config['alipay_charset'];
    $payData['sign_type'] = $config['alipay_signType'];
    $payData['timestamp'] = date('Y-m-d H:i:s');
    $payData['version'] = $config['alipay_version'];
    $payData['format'] = 'JSON';
    // 方式
    if($type=='app') $payData['method'] = 'alipay.trade.app.pay';
    elseif($type=='wap') $payData['method'] = 'alipay.trade.wap.pay';
    elseif($type=='web') $payData['method'] = 'alipay.trade.page.pay';
    elseif($type=='transfer') $payData['method'] = 'alipay.fund.trans.uni.transfer';
    // 是否回调
    if($notify_url) $payData['notify_url']=$notify_url;
    // 业务参数
    $payData['biz_content'] = json_encode($data,JSON_UNESCAPED_UNICODE);
    // 签名
    $payData['sign'] = self::getSign($payData);

    return $payData;
  }

  /* 转账到支付宝账户 */
  static function getTransfer($data){
    $res = self::getPay('transfer',$data);
		$str = http_build_query($res);
    $res = file_get_contents(self::$gatewayUrl.'?'.$str);
    return json_decode($res);
  }

  /* 序列号-证书 */
  static function getCertSN($certPath){
    $cert = file_get_contents($certPath);
    $ssl = openssl_x509_parse($cert);
    $SN = md5(self::array2string(array_reverse($ssl['issuer'])).$ssl['serialNumber']);
    return $SN;
  }

  /* 序列号-根证书 */
  static function getRootCertSN($certPath){
    $cert = file_get_contents($certPath);
    $array = explode('-----END CERTIFICATE-----', $cert);
    $SN = null;
    for($i=0; $i<count($array)-1; $i++){
      $ssl[$i] = openssl_x509_parse($array[$i].'-----END CERTIFICATE-----');
      if(strpos($ssl[$i]['serialNumber'],'0x') === 0){
        $ssl[$i]['serialNumber'] = self::hex2dec($ssl[$i]['serialNumber']);
      }
      if($ssl[$i]['signatureTypeLN']=='sha1WithRSAEncryption' || $ssl[$i]['signatureTypeLN']=='sha256WithRSAEncryption') {
        if($SN == null){
          $SN = md5(self::array2string(array_reverse($ssl[$i]['issuer'])).$ssl[$i]['serialNumber']);
        }else{
          $SN = $SN .'_'.md5(self::array2string(array_reverse($ssl[$i]['issuer'])).$ssl[$i]['serialNumber']);
        }
      }
  }
  return $SN;
  }
  // 转高精度数字
  static private function hex2dec($hex){
    $dec = 0;
    $len = strlen($hex);
    for ($i = 1; $i<=$len; $i++) {
      $dec = @bcadd($dec, bcmul(strval(hexdec($hex[$i - 1])), bcpow('16', strval($len-$i))));
    }
    return $dec;
  }
  // 数组转字符
  static private function array2string($array){
    $string = [];
    if ($array && is_array($array)) {
      foreach ($array as $key => $value) {
        $string[] = $key.'='.$value;
      }
    }
    return implode(',', $string);
  }

  /* 签名-获取 */
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

  /* 签名-验证 */
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
  static private function parameter($data){
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