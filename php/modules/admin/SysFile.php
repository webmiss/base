<?php
namespace App\Admin;

use Config\Env;
use Library\FileEo;
use Library\Upload;
use Service\Base;
use Service\AdminToken;

class SysFile extends Base {

  private static $dirRoot = 'upload/';

  /* 列表 */
  static function List(){
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $path = self::JsonName($json, 'path');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($path)) return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    // 数据
    FileEo::$Root = self::$dirRoot;
    $list = FileEo::List($path);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功', 'url'=>Env::$base_url.self::$dirRoot, 'data'=>$list]);
  }

  /* 新建文件夹 */
  static function Mkdir(){
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $path = self::JsonName($json, 'path');
    $name = self::JsonName($json, 'name');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($path) || empty($name)) return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    // 数据
    FileEo::$Root = self::$dirRoot;
    if(!FileEo::Mkdir($path.$name)) return self::GetJSON(['code'=>5000, 'msg'=>'新建文件夹失败!']);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功']);
  }

  /* 重命名 */
  static function Rename(){
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $path = self::JsonName($json, 'path');
    $rename = self::JsonName($json, 'rename');
    $name = self::JsonName($json, 'name');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($path) || empty($rename) || empty($name)) return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    // 数据
    FileEo::$Root = self::$dirRoot;
    if(!FileEo::Rename($path.$rename, $path.$name)) return self::GetJSON(['code'=>5000, 'msg'=>'重命名失败!']);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功']);
  }

  /* 上传 */
  static function Upload(){
    // 参数
    $token = self::Post('token');
    $path = self::Post('path');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($path)) return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    // 数据
    $file = $_FILES['up'];
    $img = Upload::File($file, ['path'=>self::$dirRoot . $path, 'bind'=>null]);
    if(empty($img)) return self::GetJSON(['code'=>5000, 'msg'=>'上传失败!']);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功']);
  }

  /* 下载 */
  static function Down(){
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $path = self::JsonName($json, 'path');
    $filename = self::JsonName($json, 'filename');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($path) || empty($filename)) return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    // 返回
    self::GetJSON();
    FileEo::$Root = self::$dirRoot;
    return FileEo::Bytes($path.$filename);
  }

  /* 删除 */
  static function Remove(){
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $path = self::JsonName($json, 'path');
    $data = self::JsonName($json, 'data');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($path) || empty($data)) return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    // 数据
    FileEo::$Root = self::$dirRoot;
    $files = json_decode($data, true);
    foreach($files as $val) FileEo::RemoveAll($path.$val);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功']);
  }

}