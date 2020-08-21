<?php

namespace app\modules\admin\controller;

use app\controller\Base;
use app\library\Safety;
use app\model\User;
use app\model\UserInfo;

class UserController extends Base{

	/* 首页 */
	function loginAction(){
    // 数据
    $uname = trim($this->request->get('uname'));
    $passwd = $this->request->get('passwd');
    // 用户名是否合法
    if(Safety::isRight('uname',$uname)!==true && Safety::isRight('tel',$uname)!==true && Safety::isRight('email',$uname)!==true){
      return self::getJSON(['code'=>4000,'msg'=>'请输入用户名/手机/邮箱']);
    }
    // 查询数据
    $builder = $this->modelsManager->createBuilder();
    $builder->addfrom('app\model\User', 'a');
    $builder->leftJoin('app\model\UserInfo', 'a.id=b.uid', 'b');
    $builder->leftJoin('app\model\UserPerm', 'a.id=c.uid', 'c');
    $builder->where(
      '(a.uname = :uname: OR a.tel = :uname: OR a.email= :uname:) AND a.password = :passwd:',
      ['uname'=>$uname, 'passwd'=>md5($passwd)]
    );
    $builder->columns('
      a.id as id,a.state as state,
      b.position as position,b.nickname as nickname,b.name as name,b.gender as gender,b.birthday as birthday,b.img as img,
      c.state_admin as state_admin
    ');
    $uData = $builder->getQuery()->execute()->toArray();
    // 判断结果
    if(empty($uData)) return self::getJSON(['code'=>4010]);
    $uData = (Object)$uData[0];
    // 是否禁用
    if($uData->state!='1') return self::getJSON(['code'=>4011]);
    elseif($uData->state_admin!='1') return self::getJSON(['code'=>4012]);
    // 登录时间
    $model = User::findFirst('id='.$uData->id);
    $model->ltime = date('YmdHis');
    $model->save();
    // 结果
    return self::getJSON([
      'code'=>0,
      'uinfo'=>[
        'uid'=>$uData->id,
        'uname'=>$uname,
        'position'=>$uData->position,
        'nickname'=>$uData->nickname,
        'name'=>$uData->name,
        'gender'=>$uData->gender,
        'img'=>$uData->img?$this->config->base_url.$uData->img:'',
      ],
      'token'=>self::setToken($uData->id,['uname'=>$uname]),
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
      $uinfo = UserInfo::findFirst(['uid='.$res->uid,'columns'=>'nickname,position,name,img']);
      $uinfo->img = $uinfo->img?$this->config->base_url.$uinfo->img:'';
      return self::getJSON(['code'=>0,'time'=>$time,'uinfo'=>$uinfo]);
    }else{
      return self::error(1000);
    }
  }

}