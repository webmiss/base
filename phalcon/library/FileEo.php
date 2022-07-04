<?php
namespace Library;

use Service\Base;

/* 文件类 */
class FileEo extends Base {

  public static $Root = '';

  /* 列表 */
  static function List(string $path=''): array {
    // 路径
    $path = $path=='/'?'':trim($path, '/').'/';
    $path = preg_replace('/\.\.|\.\\//','',$path);
    // 数据
    $res = ['path'=> $path, 'dirNum'=> 0, 'fileNum'=> 0, 'size'=> 0, 'folder'=> [], 'files'=> []];
    // 是否文件夹
    $root = self::$Root.$path;
    if(!is_dir($root)) return $res;
    // 文件夹&文件
    $list = scandir($root);
    foreach($list as $f) {
      if($f=='.' || $f=='..') continue;
      $ff = $root . '/' . $f;
      $size = self::FileSize($ff);
      $res['size'] += $size;
      $ctime = self::GetCtime($ff);
      $mtime = self::GetMtime($ff);
      $perm = self::GetPerm($ff);
      if(is_dir($ff)){
        $res['folder'][] = ['name'=>$f, 'size'=>self::FormatBytes($size), 'ctime'=>$ctime, 'mtime'=>$mtime, 'perm'=>$perm];
        $res['dirNum']++;
      }else {
        $ext = self::GetExt($f);
        $res['files'][] = ['name'=>$f, 'size'=>self::FormatBytes($size), 'ctime'=>$ctime, 'mtime'=>$mtime, 'perm'=>$perm, 'ext'=>$ext];
        $res['fileNum']++;
      }
    }
    // 大小
    $res['size'] = self::FormatBytes($res['size']);
    return $res;
  }

  /* 全部文件 */
  static function AllFile(string $path=''): array {
    $res = [];
    // 是否文件夹
    $root = self::$Root.$path;
    if(!is_dir($root)) return $res;
    // 文件夹&文件
    $list = scandir($root);
    foreach($list as $f) {
      if($f=='.' || $f=='..') continue;
      $ff = $root . '/' . $f;
      if(is_file($ff)) $res[] = $f;
    }
    return $res;
  }

  /* 统计大小 */
  static function FileSize($ff){
    $total = 0;
    // 文件
    if(is_file($ff)){
      $total += filesize($ff);
    }elseif(is_dir($ff)){
      // 文件夹
      $list = scandir($ff);
      foreach($list as $f){
        if($f=='.' || $f=='..') continue;
        $total += self::FileSize($ff.'/'.$f);
      }
    }
    return $total;
  }
  /* 创建时间 */
  static function GetCtime($ff) {
    return date("Y-m-d H:i:s",filectime($ff));
  }
  /* 修改时间 */
  static function GetMtime($ff='') {
    return date("Y-m-d H:i:s",filemtime($ff));
  }
  /* 获取权限值 */
  static function GetPerm($ff) {
    return substr(sprintf('%o',fileperms($ff)),-3);
  }
  /* 文件后缀 */
  static function GetExt($fileName){
    return strtolower(substr(strrchr($fileName, '.'), 1));
  }
  /* 格式化 */
  static function FormatBytes($bytes){
    if($bytes >= 1073741824){
      $bytes = round($bytes*100/1073741824)/100 . ' GB';
    }elseif($bytes >= 1048576){
      $bytes = round($bytes*100/1048576)/100 . ' MB';
    }elseif($bytes >= 1024){
      $bytes = round($bytes*100/1024)/100 . ' KB';
    }else{
      $bytes = $bytes . ' B';
    }
    return $bytes;
  }

  /* 是否文件 */
  static function IsFile(string $file=''): bool {
    $file = self::$Root.$file;
    return is_file($file);
  }

  /* 创建目录 */
  static function Mkdir(string $path=''): bool {
    $path = self::$Root.$path;
    if(!file_exists($path)) return mkdir($path,0777,true);
    return true;
  }
  static function MkdirFile(string $file=''): bool {
    if(empty($file)) return false;
    $arr = explode('/', $file);
    $n = count($arr);
    if($n>=2){
      unset($arr[$n-1]);
      $dir = implode('/', $arr);
      if(!file_exists($dir)) return mkdir($dir, 0777, true);
    }
    return true;
  }

  /* 重命名 */
  static function Rename(string $rename, string $name): bool {
    $src = self::$Root.$rename;
    $dst = self::$Root.$name;
    return rename($src,$dst);
  }

  /* 上传 */
  static function Upload(string $tmp, string $to): bool {
    $to = self::$Root.$to;
    return move_uploaded_file($tmp, $to);
  }

  /* 写入 */
  static function Writer(string $file='', string $content): bool {
    $file = self::$Root.$file;
    self::MkdirFile($file);
    return file_put_contents($file, $content)?true:false;
  }

  /* 追加 */
  static function WriterEnd(string $file='', string $content): bool {
    $file = self::$Root.$file;
    self::MkdirFile($file);
    return file_put_contents($file, $content, FILE_APPEND)?true:false;
  }

  /* 读取 */
  static function Bytes(string $file) {
    $dst = self::$Root.$file;
    return file_get_contents($dst);
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