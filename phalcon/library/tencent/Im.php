<?php
namespace Library\Tencent;

use Service\Base;
use Config\Tencent;
use Util\Base64;

/* 即时通信 */
class Im extends Base {

  /* 鉴权票据 */
  static function UserSig($userId, int $expire=86400*180): string {
    // 配置
    $cfg = Tencent::TRTC();
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

  /* 验证 */
  static function VerifySig($userId, $userSig): bool {
    // 数据
    $base64 = Base64::UrlDecode($userSig);
    if($base64===false) return false;
    // 解压
    $un_sig = Base64::UnCompress($base64);
    if($un_sig===false) return false;
    $data = json_decode($un_sig, true);
    // 配置
    $cfg = Tencent::TRTC();
    if($cfg['SDKAppID']!=$data['TLS.sdkappid']) return false;
    if($userId!=$data['TLS.identifier']) return false;
    // 是否过期
    $now_time = time();
    $out_time = $data['TLS.time']+$data['TLS.expire'];
    if($now_time > $out_time) return false;
    // 验证Sig
    $sig = self::hmacsha256($data, $cfg['SecretKey']);
    if($sig!=$data['TLS.sig']) return false;
    return true;
  }

  /* 获取Sig */
  private static function hmacsha256(array $param, string $key): string {
    $content = '';
    foreach($param as $k=>$v){
      if($k=='TLS.ver' || $k=='TLS.sig') continue;
      $content .= $k.':'.$v."\n";
    }
    return Base64::Encode(hash_hmac('sha256', $content, $key, true));
  }

}