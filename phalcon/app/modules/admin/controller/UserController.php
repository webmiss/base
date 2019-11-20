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
      return self::getJSON(['code'=>4000]);
    }
    // 查询数据
    $builder = $this->modelsManager->createBuilder();
    $builder->addfrom('app\model\User', 'a');
    $builder->leftJoin('app\model\UserInfo', 'a.id=b.uid', 'b');
    $builder->where(
      '(uname = :uname: OR tel = :uname: OR email= :uname:) AND password = :passwd:',
      ['uname'=>$uname, 'passwd'=>md5($passwd)]
    );
    $builder->columns('a.id,a.state,a.state_admin,b.position,b.nickname,b.name,b.gender,b.birthday,b.img');
    $uData = $builder->getQuery()->execute()->toArray();
    // 判断结果
    if(empty($uData)) return self::getJSON(['code'=>4010]);
    $uData = (Object)$uData[0];
    // 是否禁用
    if($uData->state!='1') return self::getJSON(['code'=>4011]);
    elseif($uData->state_admin!='1') return self::getJSON(['code'=>4012]);
    // 登录时间
    $model = User::findFirst('id='+$uData->id);
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
        'img'=>$uData->img,
      ],
      'token'=>self::setToken($uData->id,['uname'=>$uname]),
    ]);
  }
  
  /* 验证Token */
  function tokenAction(){
    $token = trim($this->request->get('token'));
    $res = self::verToken($token);
    if($res){
      $uinfo = UserInfo::findFirst(['uid='.$res->uid,'columns'=>'nickname,position,name,img']);
      return self::getJSON(['code'=>0,'uinfo'=>$uinfo]);
    }else{
      return self::getJSON(['code'=>0]);
    }
  }

}