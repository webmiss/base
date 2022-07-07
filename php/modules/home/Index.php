<?php
namespace App\Home;

use Service\Base;
use Library\Qrcode;
use Library\FileEo;
use Library\Captcha;
use Library\Upload;
use Library\Google\YouTube;
use Util\Util;

class Index extends Base {

  /* 首页 */
  static function Index() {
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'PHP Web']);
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
    // 验证
    $param = self::Json();
    if(!Upload::OssPolicyVerify($param)) return '';
    FileEo::WriterEnd('upload/callback_oss.json', json_encode($param));
    return self::GetJSON(['Status'=>'Ok']);
  }

  /* YouTube */
  static function YouTubeToken() {
    $url = YouTube::GetCode();
    $html = '<a href="'.$url.'">点击授权</a>';
    echo $html;
  }
  static function YouTubeData() {

  }

  // /* 一、授权: YouTube-OAuth */
  // static function YouTubeOAuth() {
  //   $url = YouTube::GetCode();
  //   $html = '<a href="'.$url.'">点击授权</a>';
  //   echo $html;
  // $code = $_GET['code'];
    // $res = YouTube::GetToken($code);
    // if(!is_string($res)){
    //   return self::GetJSON(['code'=>0, 'msg'=>'获取Token', 'data'=>$res]);
    // }else{
    //   return self::GetJSON(['code'=>0, 'msg'=>$res]);
    // }
  // }
  // /* 二、回调: youtube_code.json */
  // static function YouTubeCallback() {
  //   FileEo::WriterEnd('upload/youtube_code.json', json_encode($_GET));
  //   return self::GetJSON(['code'=>0]);
  // }
  // /* 三、令牌: /youtube_token?code=xxx */
  
  // /* 四、刷新: 1分钟后自动获取 */
  // static function YouTubeRefreshToken() {
  //   $res = YouTube::RefreshToken();
  //   if(!is_string($res)){
  //     return self::GetJSON(['code'=>0, 'msg'=>'获取Token', 'data'=>$res]);
  //   }else{
  //     return self::GetJSON(['code'=>0, 'msg'=>$res]);
  //   }
  // }

}
