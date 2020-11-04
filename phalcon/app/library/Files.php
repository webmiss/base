<?php
namespace app\library;

/* 文件类 */
class Files{

  public static $file_root = '.';
  private static $zipObj = null;
  
  /* 列表(文件夹&文件) */
  static function lists($path='/') {
    // 路径
    $path = $path=='/'?'':trim($path, '/').'/';
    $path = preg_replace('/\.\.|\.\\//','',$path);
    // 参数
    $data = [
      'path'=> $path,
      'dirNum'=> 0,
      'fileNum'=> 0,
      'size'=> 0,
      'folder'=> [],
      'files'=> [],
    ];
    // 是否文件夹
    $root = self::$file_root.$path;
    if(!is_dir($root)) return $data;
    // 文件夹&文件
    $list = scandir($root);
    foreach($list as $f) {
      if($f=='.' || $f=='..') continue;
      $ff = $root . '/' . $f;
      $size = self::fileSize($ff);
      $data['size'] += $size;
      $ctime = self::getCtime($ff);
      $mtime = self::getMtime($ff);
      $perm = self::getPerm($ff);
      if(is_dir($ff)){
        $data['folder'][] = ['name'=>$f, 'size'=>self::formatBytes($size), 'ctime'=>$ctime, 'mtime'=>$mtime, 'perm'=>$perm];
        $data['dirNum']++;
      }else {
        $ext = self::getExt($f);
        $data['files'][] = ['name'=>$f, 'size'=>self::formatBytes($size), 'ctime'=>$ctime, 'mtime'=>$mtime, 'perm'=>$perm, 'ext'=>$ext];
        $data['fileNum']++;
      }
    }
    // 大小
    $data['size'] = self::formatBytes($data['size']);
    return $data;
  }

  /* 新建-文件夹 */
  static function mkDir($path) {
    $dir = self::$file_root.$path;
    if(!is_dir($dir)){
      return mkdir($dir,0777,true)===true?true:false;
    }else{
      return false;
    }
  }

  /* 新建-文件 */
  static function saveFile($file,$content=''){
    return file_put_contents($file,$content)===true?true:false;
  }

  /* 重命名 */
  static function reName($rename,$name) {
    $src = self::$file_root.$rename;
    $dst = self::$file_root.$name;
    return rename($src,$dst)===true?true:false;
  }
  
  /* Download */
  static function down($file){
    $fileinfo = pathinfo($file);
    header('Content-type: application/x-'.$fileinfo['extension']);
    header('Content-Disposition: attachment; filename='.$fileinfo['basename']);
    header('Content-Length: '.filesize($file));
    return readfile($file);
  }

  /* 删除(文件夹&文件) */
  static function delAll($path){
    $obj = self::$file_root.$path;
    if(is_dir($obj)){
      // 文件夹
      $list = scandir($obj);
      foreach ($list as $f) {
        if($f=='.' || $f=='..') continue;
        $ff = $path.'/'.$f;
        if(is_dir(self::$file_root.$ff)) self::delAll($ff);
        else unlink(self::$file_root.$ff);
      }
      // 空目录
      rmdir($obj);
    }elseif(is_file($obj)){
      // 文件
      unlink($obj);
    }
  }

  /* 压缩 */
  static function zipAll($path,$files,$name){
    self::$zipObj = new \ZipArchive();
    $filename = self::$file_root.$path.$name.'.zip';
    if(!self::$zipObj->open($filename,\ZipArchive::CREATE)) return false;
    // 追加文件
    foreach($files as $val){
      self::zipAdd($path,$val);
    }
    self::$zipObj->close();
    return $filename;
  }
  static private function zipAdd($path,$name){
    if(is_dir(self::$file_root.$path.$name)){
      $dirs = scandir(self::$file_root.$path.$name);
      foreach ($dirs as $dir) {
        if ($dir != '.' && $dir != '..') {
          // 目录和文件
          $sonDir = $path.$name.'/'.$dir;
          if(is_dir(self::$file_root.$sonDir)){
            // 递归
            self::zipAdd($sonDir,$dir);
          }else{
            self::$zipObj->addFile(self::$file_root.$sonDir,$sonDir);
          }
        }
      }
    }else{
      if(is_file(self::$file_root.$path.$name)){
        self::$zipObj->addFile(self::$file_root.$path.$name,$path.$name);
      }
    }
  }

  /* 大小(文件夹&文件) */
  static function fileSize($ff){
    $total = 0;
    // 文件
    if(is_file($ff)){
      $total += filesize($ff);
    }elseif(is_dir($ff)){
      // 文件夹
      $list = scandir($ff);
      foreach($list as $f){
        if($f=='.' || $f=='..') continue;
        $total += self::fileSize($ff.'/'.$f);
      }
    }
    return $total;
  }

  /* 获取权限值 */
  static function getPerm($ff) {
    return substr(sprintf('%o',fileperms($ff)),-3);
  }
  /* 创建时间 */
  static function getCtime($ff) {
    return date("Y-m-d H:i:s",filectime($ff));
  }
  /* 修改时间 */
  static function getMtime($ff='') {
    return date("Y-m-d H:i:s",filemtime($ff));
  }
  /* 文件后缀 */
  static function getExt($fileName){
    return strtolower(substr(strrchr($fileName, '.'), 1));
  }

  /* 格式化 */
  static function formatBytes($bytes){
    if($bytes >= 1073741824){
      $bytes = round($bytes*100/1073741824)/100 . 'GB';
    }elseif($bytes >= 1048576){
      $bytes = round($bytes*100/1048576)/100 . 'MB';
    }elseif($bytes >= 1024){
      $bytes = round($bytes*100/1024)/100 . 'KB';
    }else{
      $bytes = $bytes . 'B';
    }
    return $bytes;
  }
}