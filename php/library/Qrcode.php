<?php
namespace Library;

use Library\Barcode;
use Zxing\QrReader;

/* 二维码类 */
class Qrcode {

  /* 生成 */
  static function Create($params=[]): ?string {
    // 参数
    $param = array_merge([
      'text'=> '',              //内容
      'type'=>'qr',             //类型: upc-a、code-39、qr、dmtx等
      'tmpPath'=>'upload/tmp/', //缓存目录
      'filename'=>self::_getName().'.png', //文件名
      'options'=>['f'=>'png','p'=>-20,'w'=>200,'h'=>200], //配置
    ],$params);
    // 创建目录
    if(!FileEo::Mkdir($param['tmpPath'])) return null;
    // 文件
    $file = $param['tmpPath'] . $param['filename'];
    // 生成
    $qrcode = new Barcode();
    $img = $qrcode->render_image($param['type'],$param['text'],$param['options']);
    imagepng($img,$file);
    imagedestroy($img);
    // 内容
    $ct = FileEo::Bytes($file);
    // 清理
    FileEo::RemoveAll($file);
    return $ct;
  }

  /* 识别 */
  static function Scan($file=''){
    $qrcode = new QrReader($file);
    return $qrcode->text();
  }

  /* 获取名称 */
  static private function _getName(){
    list($msec, $sec) = explode(' ', microtime());
    return date('YmdHis').substr($msec,2,4);
  }

}