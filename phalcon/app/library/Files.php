<?php
namespace app\library;

/* 文件类 */
class Files{

  public static $file_root = '.';
  private static $zipObj = null;
  
  /* Folders & Files */
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
    $d = opendir($root);
    while($f = readdir($d)) {
      if($f == "." || $f == ".."){continue;}
      $ff = $root . '/' . $f;
      $ctime = self::getCtime($ff);
      $mtime = self::getMtime($ff);
      $perm = self::getPerm($ff);
      if(is_dir($ff)){
        $size = self::dirsize($ff);
        $data['folder'][] = ['name'=>$f, 'size'=>self::formatBytes($size), 'ctime'=>$ctime, 'mtime'=>$mtime, 'perm'=>$perm];
        $data['size'] += $size;
        $data['dirNum']++;
      }else {
        $size = self::size($ff);
        $ext = self::getExt($f);
        $data['files'][] = ['name'=>$f, 'size'=>self::formatBytes($size), 'ctime'=>$ctime, 'mtime'=>$mtime, 'perm'=>$perm, 'ext'=>$ext];
        $data['size'] += $size;
        $data['fileNum']++;
      }
    }
    // 大小
    $data['size'] = self::formatBytes($data['size']);
    // !empty($data['folder'])?sort($data['folder']):false;
    // !empty($data['files'])?sort($data['files']):false;
    return $data;
  }

  /* Mkdir */
  static function mkDir($path) {
    $dir = self::$file_root.$path;
    if(!is_dir($dir)){
      return mkdir($dir,0777,true)===true?true:false;
    }else{return false;}
  }
  /* saveFile */
  static function saveFile($file,$content=''){
    return file_put_contents($file,$content)===true?true:false;
  }

  /* Rename */
  static function reName($rename,$name) {
    $ff = self::$file_root.$rename;
    $f = self::$file_root.$name;
    return rename($ff,$f)===true?true:false;
  }

  /* All Files */
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

  /* Upload */
  static function upload($path,$upName){
    $file = str_replace(' ','_',$_FILES[$upName]['name']);
    return move_uploaded_file($_FILES[$upName]['tmp_name'],self::$file_root.$path.$file)===true?true:false;
  }
  
  /* Download */
  static function down($file){
    $fileinfo = pathinfo($file);
    header('Content-type: application/x-'.$fileinfo['extension']);
    header('Content-Disposition: attachment; filename='.$fileinfo['basename']);
    header('Content-Length: '.filesize($file));
    return readfile($file);
  }

  /* Delete folder and file */
  static function delAll($path){
    if(is_dir(self::$file_root.$path)){
      $dirs = scandir(self::$file_root.$path);
      foreach ($dirs as $dir) {
        if ($dir != '.' && $dir != '..') {
          // 目录和文件
          $sonDir = $path.'/'.$dir;
          if(is_dir(self::$file_root.$sonDir)){
            // 递归删除
            self::delAll($sonDir);
            // 删除空目录
            rmdir(self::$file_root.$sonDir);
          }else{
            // 删除文件
            unlink(self::$file_root.$sonDir);
          }
        }
      }
      // 删除空目录
      rmdir(self::$file_root.$path);
    }else{
      if(is_file(self::$file_root.$path)) unlink(self::$file_root.$path);
    }
  }

  /* EditPerm */
  static function editPerm($path,$perm) {
    $ff = self::$file_root.$path;
    $perm = octdec($perm);
    $data = false;
    if(!is_dir($ff)) {
      $data = chmod($ff,$perm)===true?true:false;
    }else {
      $data = self::editDirPerm($ff,$perm)===true?true:false;
    }
    return $data;
  }
  static function editDirPerm($dir,$perm) {
    $data = true;
    $d = opendir($dir);
    while ($file = readdir($d)){
      if($file == "." || $file == ".."){continue;}
      $fullpath = $dir . "/" . $file;
      if(!is_dir($fullpath)){
        $data = chmod($fullpath,$perm)===true?true:false;
      }else{
        $data = self::editDirPerm($fullpath,$perm)===true?true:false;
      }
      if($data==false){break;}
    }
    closedir($d);
    return chmod($dir,$perm)===true&&$data?true:false;
  }

  /* Folder Size */
  static function dirsize($dir) {
    $handle=opendir($dir);
    $size = 0;
    while($file=readdir($handle)){
      if($file == "." || $file == ".."){continue;}
      if(is_dir("$dir/$file")){
        $size += self::dirsize("$dir/$file");
      }else{
        $size += filesize("$dir/$file");
      }
    }
    closedir($handle);
    return $size;
  }

  /* File Size */
  static function size($file='') {
    $total = 0;
    // File
    if(is_file($file)){}
    return $total;
  }

  /* File Perm */
  static function getPerm($ff) {
    return substr(sprintf('%o',fileperms($ff)),-3);
  }
  /* Ctime */
  static function getCtime($ff) {
    return date("Y-m-d H:i:s",filectime($ff));
  }
  /* Mtime */
  static function getMtime($ff='') {
    return date("Y-m-d H:i:s",filemtime($ff));
  }
  /* File ext */
  static function getExt($fileName){
    return strtolower(substr(strrchr($fileName, '.'), 1));
  }

  /* Format Byte */
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