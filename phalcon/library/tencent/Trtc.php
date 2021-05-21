<?php
namespace Library\Tencent;

use Config\Tencent;
use Library\Curl;

/* 实时音视频 */
class Trtc extends Signature {

  static int $SdkAppId = 0;

  /* 公共配置 */
  static function Init() {
    self::$ApiUrl = 'https://trtc.tencentcloudapi.com/';
    self::$Host = 'trtc.tencentcloudapi.com';
    self::$Service = 'trtc';
    self::$Version = '2019-07-22';
    $cfg = Tencent::TRTC();
    self::$SdkAppId = $cfg['SDKAppID'];
  }

  /* 房间-查询 */
  static function RoomList() {
    self::Init();
    Signature::$Action = 'DescribeRoomInformation';
    $time = time();
    $data = [
      'SdkAppId'=> (string)self::$SdkAppId,
      'StartTime'=> $time-3600*24*3,
      'EndTime'=> $time,
    ];
    $header = Signature::V3Header($data);
    return Curl::PostJson(self::$ApiUrl, $data, $header);
  }

  /* 房间-解散 */
  static function RoomDismiss($roomId) {
    self::Init();
    Signature::$Action = 'DismissRoomByStrRoomId';
    $data = [
      'SdkAppId'=> self::$SdkAppId,
      'RoomId'=> $roomId,
    ];
    $header = Signature::V3Header($data);
    return Curl::PostJson(self::$ApiUrl, $data, $header);
  }

}