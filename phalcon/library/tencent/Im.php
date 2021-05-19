<?php
namespace Library\Tencent;

use Service\Base;
use Config\Tencent;
use Util\Base64;
use Util\Hmac;
use Library\Curl;

/* 即时通信 */
class Im extends Base {

  const Url = 'https://console.tim.qq.com/v4/';
  const ContentType = 'json';

  /* 群组-列表 */
  static function GroupList() {
    $url = self::GetURL('group_open_http_svc/get_appid_group_list');
    return Curl::PostJson($url, []);
  }
  /* 群组-创建 */
  static function GroupCreate(array $data) {
    $url = self::GetURL('group_open_http_svc/create_group');
    return Curl::PostJson($url, $data);
  }
  /* 群组-解散 */
  static function GroupDestroy(array $data) {
    $url = self::GetURL('group_open_http_svc/destroy_group');
    return Curl::PostJson($url, $data);
  }

  /* 请求地址 */
  static function GetURL(string $apiUrl) {
    $cfg = Tencent::TRTC();
    $userSig = self::UserSig($cfg['UserID']);
    $random = time();
    return self::Url.$apiUrl.'?sdkappid='.$cfg['SDKAppID'].'&identifier='.$cfg['UserID'].'&usersig='.$userSig.'&random='.$random.'&contenttype='.self::ContentType;
  }

  /* 鉴权票据 */
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

  /* 验证签名 */
  static function VerifySig($userId, $userSig): int {
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
    return Base64::Encode(Hmac::Sha256($content, $key));
  }

}