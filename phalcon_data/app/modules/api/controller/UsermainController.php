<?php
namespace app\modules\api\controller;

use app\library\BaiduAi;

class UserMainController extends UserBase{

  /* 百度Token */
  function baiduAudioAction(){
    $text = $this->request->get('text');
    if(empty($text)) return self::getJSON(['code'=>4000]);
    // Token
    $token = $this->redis->get('baidu_token');
    if(!$token){
      $token = BaiduAi::getToken();
      $this->redis->setex('baidu_token',1.9*3600,$token);
    }
    $url = 'https://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=1&tex='.$text.'&tok='.$token;
    return self::getJSON(['code'=>0,'url'=>$url]);
  }

}