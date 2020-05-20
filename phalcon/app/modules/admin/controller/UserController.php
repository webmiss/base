<?php

namespace app\modules\admin\controller;

use app\controller\Base;
use app\library\Centre;
use app\library\Safety;

use app\model\UserPerm;

class UserController extends Base{

	/* 首页 */
	function loginAction(){
    // 数据
    $uname = trim($this->request->get('uname'));
    $passwd = $this->request->get('passwd');
    // 用户名是否合法
    if(Safety::isRight('uname',$uname)!==true && Safety::isRight('tel',$uname)!==true && Safety::isRight('email',$uname)!==true){
      return self::getJSON(['code'=>4000]);
    }
    // 用户数据
    $uInfo = Centre::login($uname,$passwd);
    if($uInfo->code!=0) return self::getJSON(['code'=>4000,'msg'=>$uInfo->msg]);
    $uInfo = $uInfo->info;
    $uInfo->uname = $uname;
    // 登录权限
    $uData = UserPerm::findFirst(['uid='.$uInfo->uid,'columns'=>'state_admin']);
    if(!$uData) return self::getJSON(['code'=>4010,'msg'=>'没有权限']);
    // 是否禁用
    if($uData->state_admin!='1') return self::getJSON(['code'=>4012]);
    unset($uData->state_admin);
    return self::getJSON([
      'code'=>0,
      'uinfo'=>$uInfo,
      'token'=>self::setToken($uInfo->uid,[
        'uname'=>$uname,
      ])
    ]);
  }
  
  /* 验证Token */
  function tokenAction(){
    $token = $this->request->get('token');
    $uinfo = $this->request->get('uinfo');
    $res = self::verToken($token);
    if($res){
      $time = $this->redis->ttl($this->config->token_name.$res->uid);
      if(!$uinfo) return self::getJSON(['code'=>0,'time'=>$time]);
      // 用户信息
      $uinfo = Centre::uinfo($res->uid);
      if($uinfo->code!=0) return self::getJSON(['code'=>4000,'msg'=>$uinfo->msg]);
      // 数据
      $uinfo = $uinfo->info;
      $uinfo->uid = $res->uid;
      $uinfo->uname = $res->data->uname;
      if(!is_object($uinfo)) return self::getJSON(['code'=>4011,'msg'=>$uinfo]);
      return self::getJSON(['code'=>0,'time'=>$time,'uinfo'=>$uinfo]);
    }else{
      return self::error(1001);
    }
  }

}