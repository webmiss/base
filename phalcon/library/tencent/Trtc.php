<?php
namespace Library\Tencent;

use Config\Tencent;
use Library\Curl;

/* 实时音视频 */
class Trtc extends Signature {

  static int $SdkAppId = 0;

  /* 公共配置 */
  static function Init() {
    $cfg = Tencent::TRTC();
    self::$ApiUrl = 'https://trtc.tencentcloudapi.com/';
    self::$Host = 'trtc.tencentcloudapi.com';
    self::$Service = 'trtc';
    self::$Version = '2019-07-22';
    self::$SdkAppId = $cfg['SDKAppID'];
  }

  /* 房间-查询 */
  static function RoomList(int $StartTime, int $EndTime) {
    // 参数
    self::Init();
    self::$Action = 'DescribeRoomInformation';
    // 数据
    $time = time();
    $data = [
      'SdkAppId'=> (string)self::$SdkAppId,
      'StartTime'=> $StartTime,
      'EndTime'=> $EndTime,
    ];
    // 请求头
    $header = self::V3Header($data);
    return Curl::PostJson(self::$ApiUrl, $data, $header);
  }

  /* 房间-解散 */
  static function RoomDismiss(string $roomId) {
    // 参数
    self::Init();
    self::$Action = 'DismissRoomByStrRoomId';
    // 数据
    $data = [
      'SdkAppId'=> self::$SdkAppId,
      'RoomId'=> $roomId,
    ];
    // 请求头
    $header = self::V3Header($data);
    return Curl::PostJson(self::$ApiUrl, $data, $header);
  }

}