<?php
namespace App\Admin;

use Config\Env;
use Library\FileEo;
use Service\Base;
use Service\AdminToken;

class SysFile extends Base {

  private static $dirRoot = 'upload/';

  /* 列表 */
  static function List(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $path = self::Post('path');
    FileEo::$Root = self::$dirRoot;
    $list = FileEo::List($path);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功', 'url'=>Env::$base_url.self::$dirRoot, 'data'=>$list]);
  }

  /* 编辑 */
  static function Edit(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功']);
  }

}