<?php

namespace app\modules\api\controller;

use app\model\UserInfo;

class UserController extends UserBase {

  /* 验证Token */
  function tokenAction(){
    $token = $this->request->get('token');
    $uinfo = $this->request->get('uinfo');
    $res = self::verToken($token);
    if($res){
      $time = $this->redis->ttl($this->config->token_name.$res->uid);
      if(!$uinfo) return self::getJSON(['code'=>0,'time'=>$time]);
      // 用户信息
      $uinfo = UserInfo::findFirst(['uid='.$res->uid,'columns'=>'nickname,position,name,img']);
      $uinfo->img = $uinfo->img?$this->config->base_url.$uinfo->img:'';
      return self::getJSON(['code'=>0,'time'=>$time,'uinfo'=>$uinfo]);
    }else{
      return self::error(1000);
    }
  }

}