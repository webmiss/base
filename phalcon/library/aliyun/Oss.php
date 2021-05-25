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
    $cfg = Aliyun::RAM();
    if(self::$AccessKeyId=='') self::$AccessKeyId = $cfg['AccessKeyId'];
    if(self::$AccessKeySecret=='') self::$AccessKeySecret = $cfg['AccessKeySecret'];
    if(self::$Endpoint=='') self::$Endpoint = $cfg['Endpoint'];
    if(self::$Bucket=='') self::$Bucket = $cfg['Bucket'];
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
  static function ListObject($prefix): array {
    $conn = self::Init();
    if($conn==null) return false;
    try {
      $options = [
        'delimiter'=> '/',
        'prefix'=> $prefix,
        'marker'=> '',
      ];
      $listObjectInfo = $conn->listObjects(self::$Bucket, $options);
    } catch (OssException $e) {
      self::Print('[OSS] List:', $e->getMessage());
      return [];
    }
    $objectList = $listObjectInfo->getObjectList();
    print_r($objectList);
    return [];
  }

  /* 上传 */
  static function PutObject($object, $content, $options=null): bool {
    $conn = self::Init();
    if($conn==null) return false;
    try {
      $conn->putObject(self::$Bucket, $object, $content, $options);
      return true;
    } catch (OssException $e) {
      self::Print('[OSS] Put:', $e->getMessage());
      return false;
    }
  }
  

}