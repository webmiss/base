<?php
namespace App\Home;

use Service\Base;
use Library\Qrcode;
use Library\FileEo;
use Library\Captcha;
use Library\Upload;

class Index extends Base {

  /* 首页 */
  static function Index() {
    $oss = Upload::OssPolicy('jpg');
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'Web', 'oss'=>$oss]);
  }

  /* 验证码 */
  static function Vcode() {
    Captcha::Vcode();
  }

  /* 二维码 */
  static function Qrcode($name=''){
    // 内容
    $text = '';
    if($name=='docs') $text = 'https://webmis.vip/';
    elseif($name=='demo') $text = 'https://demo-app.webmis.vip/';
    elseif($name=='wechat') $text = 'http://weixin.qq.com/r/mC1YQK3EDPBzrekj93iK';
    elseif($name=='server1') $text = 'https://u.wechat.com/MNFMyg4xN7d6ihWrfoWD7So';
    elseif($name=='server2') $text = 'https://u.wechat.com/MC35ApmM-JB7K6cJD6CaYJo';
    // 创建目录
    $path = 'upload/qrcode/';
    if(!FileEo::Mkdir($path)) return;
    // 是否生成
    $file = $path.$name.'.png';
    if(!FileEo::IsFile($file)){
      $ct = Qrcode::Create(['text'=>$text]);
      FileEo::Writer($file, $ct);
    }
    // 数据
    self::getJSON();
    header('content-type: image/png');
    return FileEo::Bytes($file);
  }

  /* OSS-上传回调 */
  static function OssCallback() {
    // 参数
    $param = self::Json();
    self::Print('Data1:', $param);
    // 验证
    if(!Upload::OssPolicyVerify($param)) return '';
    // 数据处理
    self::Print('Data:', $param);
    return json_encode(['Status'=>'Ok']);
  }

}
