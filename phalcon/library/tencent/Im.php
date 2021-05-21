<?php
namespace Library\Tencent;

use Config\Tencent;
use Library\Curl;

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

}