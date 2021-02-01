<?php

namespace app\modules\home\controller;

use app\common\Base;
use app\library\Qrcode;

class IndexController extends Base{

	/* 首页 */
	public function indexAction(){
		return self::getJSON(['code'=>0, 'msg'=>'Web']);
	}

	/* 二维码 */
  function qrcodeAction($type=''){
    // 内容
    $text = '';
    if($type=='docs') $text = 'https://webmis.vip/';
    elseif($type=='demo') $text = 'https://demo-app.webmis.vip/';
    elseif($type=='wechat') $text = 'http://weixin.qq.com/r/mC1YQK3EDPBzrekj93iK';
    elseif($type=='server1') $text = 'https://u.wechat.com/MNFMyg4xN7d6ihWrfoWD7So';
    elseif($type=='server2') $text = 'https://u.wechat.com/MC35ApmM-JB7K6cJD6CaYJo';
    // 创建目录
    $path = 'upload/qrcode/';
    $filename = $type.'.png';
    if (!file_exists($path)) mkdir($path,0777,true);
    // 是否生成
    if(!is_file($path.$filename)){
      $ct = Qrcode::create(['text'=>$text]);
      file_put_contents($path.$filename,$ct);
    }
    // 数据
    self::getJSON();
    header('content-type: image/png');
    return file_get_contents($path.$filename);
  }

}