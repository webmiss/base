<?php
namespace Config;

/* 腾讯云配置 */
class Tencent {

  /* 实时音视频 */
  static function TRTC(): array {
    return [
      'SDKAppID'=> 1400517751,  //AppID
      'SecretKey'=> 'f47b43f0dc84c945b684fd3f0f11f818832e34df451757db48de5fd912264845', //AppKey
      'UserID'=> 'administrator', //管理员账号
      'ExpireTime'=> 86400 * 180, //userSig有效期
      'PlayDomain'=> 'play.webmis.vip',  //播放域名
      'PlayType'=> 'http',  //播放类型
    ];
  }

  /* API密钥 */
  static function CAPI(): array {
    return [
      'AppID'=> 1258966985,
      'SecretId'=> 'AKIDd4HDsHRKwBDySfbGfneEXZKp47uRiiTx',
      'SecretKey'=> 'FD0ZtwjFUS9ZhZBWaOwGLNBkBNM6brth',
    ];
  }

}