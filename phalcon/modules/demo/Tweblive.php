<?php
namespace App\Demo;

use Config\Tencent;
use Service\Base;
use Service\AdminToken;
use Library\Tencent\Signature;

/* TWebLive直播 */
class Tweblive extends Base {

  /* 列表 */
  static function List() {
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 数据
    $data = [
      ['id'=>1, 'group_id'=>'@TGS#aRHBAOFHK', 'name'=>'xxx直播1'],
      ['id'=>2, 'group_id'=>'@TGS#aRHBAOFHK', 'name'=>'xxx直播2'],
    ];
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功', 'list'=>$data]);
  }

  /* 用户信息 */
  static function UserInfo() {
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    $tData = AdminToken::Token($token);
    // 配置
    $cfg = Tencent::TRTC();
    $userId = (string)$tData->uid;
    $userSin = Signature::UserSig($userId);
    // 数据
    $uinfo = [
      'sdk_app_id'=> $cfg['SDKAppID'],
      'user_id'=> $userId,
      'user_sig'=> $userSin,
      'live_domain_name'=> $cfg['PlayDomain'],
    ];
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功', 'uinfo'=>$uinfo]);
  }

}