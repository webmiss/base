<?php
namespace Config;

/* 阿里云配置 */
class Aliyun {

  /* RAM访问控制 */
  static function RAM(): array {
    return [
      'AccessKeyId'=> 'LTAI5t9BgHZ11gu1WvTdTSns',
      'AccessKeySecret'=> 'WIsk3M2U7MuE526SIuc5xAdxOc2Pge',
      'Endpoint'=> 'oss-cn-chengdu.aliyuncs.com',
      'Bucket'=> 'cuixs-upload-test',
      'ImgUrl'=> 'http://img.cuixs.net/',
    ];
  }

}