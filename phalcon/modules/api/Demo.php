<?php
namespace App\Api;

use Service\Base;
use Service\ApiToken;

class Demo extends Base {

  /* 验证Token */
  static function Token() {
    // 验证
    $token = self::Post('token');
    $msg = ApiToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'验证成功']);
  }

  /* 验证Url */
  static function List() {
    // 验证
    $token = self::Post('token');
    $msg = ApiToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'验证成功']);
  }

  /* 验证Url */
  static function Perm() {
    // 验证
    $token = self::Post('token');
    $msg = ApiToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'验证成功']);
  }

}
