<?php
namespace Library\Tencent;

use Config\Tencent;
use Library\Curl;
use Util\Util;

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
    $dataStr = Util::JsonEncode($data);
    // 请求头
    $header = self::V3Header($data);
    return Curl::Request(self::$ApiUrl, $dataStr, 'POST', $header);
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
    $dataStr = Util::JsonEncode($data);
    // 请求头
    $header = self::V3Header($data);
    return Curl::Request(self::$ApiUrl, $dataStr, 'POST', $header);
  }

}