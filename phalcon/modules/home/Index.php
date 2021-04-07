<?php
namespace App\Home;

use Config\Env;
use Service\Base;
use Library\Qrcode;
use Library\FileEo;

class Index extends Base {

  /* 首页 */
  static function Index() {
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'Web']);
  }

  /* 二维码 */
  static function Qrcode($type=''){
    // 内容
    $text = '';
    if($type=='docs') $text = 'https://webmis.vip/';
    elseif($type=='demo') $text = 'https://demo-app.webmis.vip/';
    elseif($type=='wechat') $text = 'http://weixin.qq.com/r/mC1YQK3EDPBzrekj93iK';
    elseif($type=='server1') $text = 'https://u.wechat.com/MNFMyg4xN7d6ihWrfoWD7So';
    elseif($type=='server2') $text = 'https://u.wechat.com/MC35ApmM-JB7K6cJD6CaYJo';
    // 创建目录
    $path = 'upload/qrcode/';
    FileEo::$Root = Env::$root_dir;
    if(!FileEo::Mkdir($path)) return;
    // 是否生成
    $file = $path.$type.'.png';
    if(!FileEo::IsFile($file)){
      $ct = Qrcode::Create(['text'=>$text]);
      FileEo::Writer($file, $ct);
    }
    // 数据
    self::getJSON();
    header('content-type: image/png');
    return FileEo::Bytes($file);
  }

}
