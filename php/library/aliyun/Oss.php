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

  /* 签名直传 */
  static function Policy(string $dir, string $file, int $expireTime=0, int $maxSize=0): array {
    $ram = Aliyun::RAM();
    $cfg = Aliyun::OSS();
    // 默认值
    if($expireTime==0) $expireTime = $cfg['ExpireTime'];
    if($maxSize==0) $maxSize = $cfg['MaxSize'];
    // 数据
    $res = Signature::PolicySign($expireTime, $maxSize);
    $res['host'] = 'https://'.$cfg['Bucket'].'.'.$cfg['Endpoint'];
    $res['dir'] = $dir;
    $res['file'] = $file;
    $res['max_size'] = $maxSize;
    // 回调
    $callbackBody = json_encode([
      'dir'=> $dir,
      'file'=> $file,
      'expire'=> $res['expire'],
      'sign'=> md5($dir.'&'.$file.'&'.$res['expire'].'&'.$ram['AccessKeySecret']),
    ]);
    $callbackData = json_encode([
      'callbackUrl'=> $cfg['CallbackUrl'],
      'callbackBodyType'=> $cfg['CallbackType'],
      'callbackBody'=> $callbackBody,
    ]);
    $res['callback'] = base64_encode($callbackData);
    return $res;
  }

  /* 签名直传-验证 */
  static function PolicyVerify(string $dir, string $file, string $expire, string $sign): bool {
    // 配置
    $ram = Aliyun::RAM();
    // 验证
    $signTmp = md5($dir.'&'.$file.'&'.$expire.'&'.$ram['AccessKeySecret']);
    if($sign != $signTmp) return false;
    // 是否超时
    $now = time();
    $etime = (int)$expire;
    if($now > $etime) return false;
    return true;
  }

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

}