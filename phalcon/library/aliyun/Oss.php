<?php
namespace Library\Aliyun;

use Config\Aliyun;
use Service\Base;
use OSS\OssClient;
use OSS\Core\OssException;

/* 对象存储 */
class Oss extends Base {

  static $OssConn = null;               //连接
  static string $AccessKeyId = '';      //RAM: AccessKeyId
  static string $AccessKeySecret = '';  //RAM: AccessKeySecret
  static string $Endpoint = '';         //地域节点
  static string $Bucket = '';           //Bucket名称

  /* 初始化 */
  static function Init() {
    if(!extension_loaded('iconv')) self::Error('请开启 iconv 扩展!');
    // 配置
    $ramCfg = Aliyun::RAM();
    $ossCfg = Aliyun::OSS();
    if(self::$AccessKeyId=='') self::$AccessKeyId = $ramCfg['AccessKeyId'];
    if(self::$AccessKeySecret=='') self::$AccessKeySecret = $ramCfg['AccessKeySecret'];
    if(self::$Endpoint=='') self::$Endpoint = $ossCfg['Endpoint'];
    if(self::$Bucket=='') self::$Bucket = $ossCfg['Bucket'];
    // 连接
    if(!self::$OssConn){
      try {
        self::$OssConn = new OssClient(self::$AccessKeyId, self::$AccessKeySecret, self::$Endpoint);
      } catch (OssException $e) {
        self::Print('[OSS] Conn:', $e->getMessage());
        self::$OssConn = null;
      }
    }
    return self::$OssConn;
  }

  /* 列表 */
  static function ListObject($path): array {
    $res = ['folder'=>[], 'file'=>[]];
    // 连接
    $conn = self::Init();
    if($conn==null) return $res;
    // 数据
    try {
      $listObjectInfo = $conn->listObjects(self::$Bucket, ['prefix'=> $path, 'delimiter'=> '/']);
    } catch (OssException $e) {
      self::Print('[OSS] List:', $e->getMessage());
      return $res;
    }
    // 文件夹
    $prefixList = $listObjectInfo->getPrefixList();
    foreach($prefixList as $val){
      $res['folder'][] = $val->getPrefix();
    }
    // 文件
    $objectList = $listObjectInfo->getObjectList();
    foreach($objectList as $val){
      $res['file'][] = $val->getKey();
    }
    return $res;
  }

  /* 上传 */
  static function PutObject($file, $content, $options=null): bool {
    // 连接
    $conn = self::Init();
    if($conn==null) return false;
    try {
      $conn->putObject(self::$Bucket, $file, $content, $options);
      return true;
    } catch (OssException $e) {
      self::Print('[OSS] Put:', $e->getMessage());
      return false;
    }
  }

  /* 删除-单个 */
  static function DeleteObject(string $file): bool {
    if(empty($file)) return false;
    // 连接
    $conn = self::Init();
    if($conn==null) return false;
    // 执行
    try {
      $conn->deleteObject(self::$Bucket, $file);
      return true;
    } catch (OssException $e) {
      self::Print('[OSS] Del:', $e->getMessage());
      return false;
    }
  }

  /* 删除-多个 */
  static function DeleteObjects(array $files): bool {
    if(empty($files)) return false;
    // 连接
    $conn = self::Init();
    if($conn==null) return false;
    // 执行
    try {
      $conn->deleteObjects(self::$Bucket, $files);
      return true;
    } catch (OssException $e) {
      self::Print('[OSS] Dels:', $e->getMessage());
      return false;
    }
  }


  /* 删除-文件夹&文件 */
  static function DeleteObjectAll(string $path): bool {
    if(empty($path)) return false;
    // 连接
    $conn = self::Init();
    if($conn==null) return false;
    try {
      // 文件
      $last = substr($path, -1);
      if($last != '/'){
        // 执行
        $conn->deleteObject(self::$Bucket, $path);
        return true;
      }
      // 文件夹
      $nextMarker = '';
      $objects = [];
      while (true) {
        $listObjectInfo = $conn->listObjects(self::$Bucket, ['marker'=>$nextMarker, 'prefix'=>$path, 'delimiter'=>'']);
        $nextMarker = $listObjectInfo->getNextMarker();
        $listObject = $listObjectInfo->getObjectList();
        foreach($listObject as $val) $objects[] = $val->getKey();
        if($listObjectInfo->getIsTruncated() !== "true") break;
      }
      return self::DeleteObjects($objects);
    } catch (OssException $e) {
      self::Print('[OSS] DelAll:', $e->getMessage());
      return false;
    }
  }

  /* 生成文件名 */
  static function GetFileName(): string {
    list($msec, $sec) = explode(' ', microtime());
    $rand = (string)mt_rand(0, 255);
    return date('YmdHis') . substr($msec,2,3) . $rand;
  }

  /* 获取HTML文件名 */
  static function GetHtmlFile(string $html): array {
    $pattern = '/<img.*?src=[\'|\"](.*?)[\'|\"].*?[\/]?>/';
    preg_match_all($pattern, htmlspecialchars_decode($html), $match);
    $imgs = [];
    foreach($match[1] as $val){
      $imgs[] = basename($val);
    }
    return $imgs;
  }

  /* 清除HTML图片 */
  static function HtmlFileClear(string $path, string $html): bool {
    $all = self::ListObject($path);
    $imgs = self::GetHtmlFile($html);
    $objects = [];
    foreach($all['file'] as $val) {
      if(!in_array($val, $imgs)) $objects[] = $path.$val;
    }
    if(!empty($objects)) return self::DeleteObjects($objects);
    return true;
  }

}