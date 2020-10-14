<?php

namespace app\modules\admin\controller;

use app\Env;
use app\common\Base;
use app\common\AdminToken;
use app\library\Safety;
use app\model\User;
use app\model\UserInfo;

/* 用户 */
class UserController extends Base{

	/* 登录 */
	function loginAction(){
    $uname = trim($this->request->get('uname'));
    $passwd = $this->request->get('passwd');
    // 验证用户名
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
    if(empty($uData)) return self::getJSON(['code'=>4000,'msg'=>'帐号或密码错误']);
    $uData = (Object)$uData[0];
    // 是否禁用
    if($uData->state!='1') return self::getJSON(['code'=>4000,'msg'=>'该用户已被禁用']);
    elseif($uData->state_admin!='1') return self::getJSON(['code'=>4000,'msg'=>'该用户不允许登录']);
    // 登录时间
    $model = User::findFirst('id='.$uData->id);
    $model->ltime = date('YmdHis');
    $model->save();
    // 返回
    return self::getJSON([
      'code'=>0,
      'msg'=>'成功登录',
      'uinfo'=>[
        'uid'=>$uData->id,
        'uname'=>$uname,
        'position'=>$uData->position,
        'nickname'=>$uData->nickname,
        'name'=>$uData->name,
        'gender'=>$uData->gender,
        'img'=>$uData->img?Env::$base_url.$uData->img:'',
      ],
      'token'=>AdminToken::create(['uid'=>$uData->id,'uname'=>$uname]),
    ]);
  }
  
  /* 验证Token */
  function tokenAction(){
    $uinfo = $this->request->get('uinfo');
    $res = AdminToken::verify();
    if($res){
      if(!$uinfo) return self::getJSON(['code'=>0,'time'=>$res->n_time]);
      // 用户信息
      $uinfo = UserInfo::findFirst(['uid='.$res->uid,'columns'=>'nickname,position,name,img']);
      $uinfo->uname = $res->uname;
      $uinfo->img = $uinfo->img?$this->config->base_url.$uinfo->img:'';
      return self::getJSON(['code'=>0,'msg'=>'成功','time'=>$res->n_time,'uinfo'=>$uinfo]);
    }else{
      return self::getJSON(['code'=>4000,'msg'=>'请重新登录!']);
    }
  }

}