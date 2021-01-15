<?php
namespace app\library;

use app\library\Barcode;
use Zxing\QrReader;

/*
* 二维码类
*/
class Qrcode{

  /* 生成 */
  static function create($param=[]){
    // 参数
    $param = array_merge([
      'text'=> '',  //内容
      'type'=>'qr',  //类型: upc-a、code-39、qr、dmtx等
      'tmpPath'=>'upload/tmp/', //缓存目录
      'filename'=>self::_getName().'.png', //文件名
      'options'=>['f'=>'png','p'=>-20,'w'=>200,'h'=>200], //配置
    ],$param);
    // 创建目录
    if (!file_exists($param['tmpPath'])) mkdir($param['tmpPath'],0777,true);
    // 文件
    $file = $param['tmpPath'].$param['filename'];
    // 生成
    $qrcode = new Barcode();
    $img = $qrcode->render_image($param['type'],$param['text'],$param['options']);
    imagepng($img,$file);
    imagedestroy($img);
    // 内容
    $ct = file_get_contents($file);
    // 清理
    unlink($file);
    return $ct;
  }

  /* 识别 */
  static function scan($file=''){
    $qrcode = new QrReader($file);
    return $qrcode->text();
  }

  /* 获取名称 */
  static private function _getName(){
    list($msec, $sec) = explode(' ', microtime());
    return date('YmdHis').substr($msec,2,4);
  }

}