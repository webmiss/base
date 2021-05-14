<?php
namespace App\Demo;

use Service\Base;
use Service\Data;
use Service\AdminToken;
use Library\Upload;
use Util\Url;

class Tinymce extends Base {

  private static $ImgDir = 'upload/tinymce/php/';

  /* 编辑 */
  static function Edit() {
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $content = self::Post('content');
    $content = Url::Decode($content);
    // 图片回收
    Upload::HtmlImgClear($content, self::$ImgDir);
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功', 'content'=>Url::Encode($content)]);
  }

  /* 头像 */
  static function Upimg() {
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $base64 = self::Post('base64');
    if(empty($base64)) return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    // 上传
    $img = Upload::Base64(['path'=>self::$ImgDir, 'base64'=>$base64]);
    if(empty($img)) return self::GetJSON(['code'=>5000, 'msg'=>'上传失败!']);
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功', 'img'=>Data::Img(self::$ImgDir.$img)]);
  }

}