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
    if(!is_object($uInfo)) return self::getJSON(['code'=>4011,'msg'=>$uInfo]);
    $uInfo->uname = $uname;
    // 登录权限
    $uData = UserPerm::findFirst(['uid='.$uInfo->uid,'columns'=>'state_admin']);
    if(!$uData) return self::getJSON(['code'=>4010]);
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
    $token = trim($this->request->get('token'));
    $res = self::verToken($token);
    if($res){
      $uInfo = Centre::uinfo($res->uid);
      $uInfo->uid = $res->uid;
      if(!is_object($uInfo)) return self::getJSON(['code'=>4011,'msg'=>$uInfo]);
      return self::getJSON(['code'=>0,'uinfo'=>$uInfo]);
    }else{
      return self::error(1001);
    }
  }

}