<?php
namespace Config;

/* 腾讯云配置 */
class Tencent {

  /* 实时音视频 */
  static function TRTC(): array {
    return [
      'SDKAppID'=> 1400517751,  //AppID
      'SecretKey'=> 'f47b43f0dc84c945b684fd3f0f11f818832e34df451757db48de5fd912264845', //AppKey
      'ExpireTime'=> 86400 * 180, //userSig有效期
      'PlayDomain'=> 'play.webmis.vip',  //播放域名
      'PlayType'=> 'http',  //播放类型
    ];
  }

}