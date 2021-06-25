<?php
namespace App\Demo;

use Service\Base;
use Service\Data;
use Service\AdminToken;
use Library\Upload;
use Util\Url;

/* TinyMCE编辑器 */
class Tinymce extends Base {

  private static $ImgDir = 'upload/tinymce/';

  /* 编辑 */
  static function Edit() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $content = self::JsonName($json, 'content');
    $content = Url::Decode($content);
    // 验证
    $msg = AdminToken::Verify($token, '');
    if($msg != '') {
      return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    }
    // 图片回收
    Upload::HtmlImgClear($content, self::$ImgDir);
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功', 'content'=>Url::Encode($content)]);
  }

  /* 图片 */
  static function UpImg() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $base64 = self::JsonName($json, 'base64');
    // 验证
    $msg = AdminToken::Verify($token, '');
    if($msg != '') {
      return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    }
    if(empty($base64)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 上传
    $img = Upload::Base64(['path'=>self::$ImgDir, 'base64'=>$base64]);
    if(empty($img)) {
      return self::GetJSON(['code'=>5000, 'msg'=>'上传失败!']);
    }
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功', 'img'=>Data::Img(self::$ImgDir.$img)]);
  }

}