<?php
namespace Library\Tencent;

use Config\Tencent;
use Library\Curl;
use Util\Util;

/* 即时通信 */
class Im extends Signature {

  /* 请求地址 */
  static function GetURL(string $apiUrl) {
    $cfg = Tencent::TRTC();
    $userSig = self::UserSig($cfg['UserID']);
    $random = time();
    return 'https://console.tim.qq.com/v4/'.$apiUrl.'?sdkappid='.$cfg['SDKAppID'].'&identifier='.$cfg['UserID'].'&usersig='.$userSig.'&random='.$random.'&contenttype=json';
  }

  /* 群组-列表 */
  static function GroupList() {
    $url = self::GetURL('group_open_http_svc/get_appid_group_list');
    $dataStr = '{}';
    return Curl::Request($url, $dataStr, 'POST');
  }
  /* 群组-创建 */
  static function GroupCreate(array $data) {
    $url = self::GetURL('group_open_http_svc/create_group');
    $dataStr = Util::JsonEncode($data);
    return Curl::Request($url, $dataStr, 'POST');
  }
  /* 群组-解散 */
  static function GroupDestroy(array $data) {
    $url = self::GetURL('group_open_http_svc/destroy_group');
    $dataStr =  Util::JsonEncode($data);
    return Curl::Request($url, $dataStr, 'POST');
  }

}