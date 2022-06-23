<?php
namespace Library\Tencent;

use Service\Base;
use Config\Tencent;
use Util\Base64;
use Util\Hash;

/* 签名 */
class Signature extends Base {

  static string $ApiUrl = 'https://cvm.tencentcloudapi.com/';      //接口
  static string $Host = 'cvm.tencentcloudapi.com';                 //主机
  static string $Service = 'cvm';                                  //服务
  static string $RequestMethod = 'POST';                           //请求方式
  static string $ContentType = 'application/json; charset=utf-8';  //数据类型
  static string $CanonicalURI = '/';                               //URI参数
  static string $CanonicalQueryString = '';                        //查询字符串: Limit=10&Offset=0
  static string $SignedHeaders = 'content-type;host';              //参与签名
  static string $Algorithm = 'TC3-HMAC-SHA256';                    //签名算法
  static string $Action = 'DescribeInstances';                     //动作
  static string $Version = '2017-03-12';                           //版本
  static string $Region = 'ap-guangzhou';                          //区域

  /* V3-Header */
  static function V3Header(array $data=[]): array {
    // 数据
    $json = !empty($data)?json_encode($data):'{}';
    $HashedRequestPayload = Hash::Sha256($json);
    // 请求串
    $CanonicalRequest = self::$RequestMethod."\n"
    . self::$CanonicalURI."\n"
    . self::$CanonicalQueryString."\n"
    . 'content-type:'.self::$ContentType."\n".'host:'.self::$Host."\n"."\n"
    . self::$SignedHeaders."\n"
    . $HashedRequestPayload;
    // 字符串
    $timeStamp = time();
    $date = gmdate("Y-m-d", $timeStamp);
    $CredentialScope = $date.'/'.self::$Service.'/tc3_request';
    $HashedCanonicalRequest = Hash::Sha256($CanonicalRequest);
    $StringToSign = self::$Algorithm."\n"
    . $timeStamp."\n"
    . $CredentialScope."\n"
    . $HashedCanonicalRequest;
    // 计算签名
    $cfg = Tencent::CAPI();
    $SecretDate = Hash::HmacSha256($date, "TC3".$cfg['SecretKey']);
    $SecretService = Hash::HmacSha256(self::$Service, $SecretDate);
    $SecretSigning = Hash::HmacSha256('tc3_request', $SecretService);
    $Sign = Hash::HmacSha256($StringToSign, $SecretSigning, false);
    // Authorization
    $Authorization = self::$Algorithm.' '
    . 'Credential='.$cfg['SecretId'].'/'.$CredentialScope.', '
    . 'SignedHeaders='.self::$SignedHeaders.', '
    . 'Signature='.$Sign;
    // 请求头
    $header = [
      'Authorization'=> $Authorization,
      'Content-Type'=> self::$ContentType,
      'Host'=> self::$Host,
      'X-TC-Action'=> self::$Action,
      'X-TC-Version'=> self::$Version,
      'X-TC-Timestamp'=> $timeStamp,
      'X-TC-Region'=> self::$Region,
    ];
    return $header;
  }

  /* UserSig */
  static function UserSig($userId, int $expire=0): string {
    // 配置
    $cfg = Tencent::TRTC();
    if($expire==0) $expire=$cfg['ExpireTime'];
    // 参数
    $param = [
      'TLS.ver' => '2.0',
      'TLS.identifier' => strval($userId),
      'TLS.sdkappid' => strval($cfg['SDKAppID']),
      'TLS.expire' => strval($expire),
      'TLS.time' => strval(time()),
    ];
    // 签名
    $param['TLS.sig'] = self::hmacsha256($param, $cfg['SecretKey']);
    // 压缩
    $data = Base64::Compress(json_encode($param));
    return Base64::UrlEncode($data);
  }

  /* UserSig-验证 */
  static function VerifyUserSig($userId, $userSig): int {
    // 解码
    $base64 = Base64::UrlDecode($userSig);
    if($base64===false) return 0;
    // 解压
    $un_sig = Base64::UnCompress($base64);
    if($un_sig===false) return 0;
    $data = json_decode($un_sig, true);
    // 配置
    $cfg = Tencent::TRTC();
    if($cfg['SDKAppID'] != $data['TLS.sdkappid']) return 0;
    if($userId != $data['TLS.identifier']) return 0;
    // 是否过期
    $now_time = time();
    $out_time = (int)$data['TLS.time'] + (int)$data['TLS.expire'];
    if($now_time > $out_time) return 0;
    // 验证Sig
    $sig = self::hmacsha256($data, $cfg['SecretKey']);
    if($sig!=$data['TLS.sig']) return 0;
    return $out_time-$now_time;
  }
  // 获取Sig
  private static function hmacsha256(array $param, string $key): string {
    $content = 'TLS.identifier:'.$param['TLS.identifier']."\n"
    .'TLS.sdkappid:'.$param['TLS.sdkappid']."\n"
    .'TLS.time:'.$param['TLS.time']."\n"
    .'TLS.expire:'.$param['TLS.expire']."\n";
    return Base64::Encode(Hash::HmacSha256($content, $key));
  }

}