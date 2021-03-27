<?php
namespace Library;

use Base\Base;

/* 文件类 */
class FileEo extends Base {

  public static $Root = '';

  /* 创建目录 */
  static function Mkdir(string $path=''): bool {
    $path = self::$Root.$path;
    self::Print($path);
    if(!file_exists($path)) return mkdir($path,0777,true);
    return true;
  }

  /* 上传文件 */
  static function Upload(string $tmp, string $to): bool {
    $to = self::$Root.$to;
    return move_uploaded_file($tmp, $to);
  }

  /* 写入 */
  static function Writer(string $file='', string $content): ?bool {
    $file = self::$Root.$file;
    return file_put_contents($file, $content)?true:false;
  }

  /* 删除(文件夹&文件) */
  static function RemoveAll(string $path='') {
    if($path=='') return false;
    $obj = self::$Root.$path;
    if(is_dir($obj)){
      // 文件夹
      $list = scandir($obj);
      foreach ($list as $f) {
        if($f=='.' || $f=='..') continue;
        $ff = $path.'/'.$f;
        if(is_dir(self::$Root.$ff)) self::RemoveAll($ff);
        else unlink(self::$Root.$ff);
      }
      // 空目录
      rmdir($obj);
    }elseif(is_file($obj)){
      // 文件
      unlink($obj);
    }
  }

}