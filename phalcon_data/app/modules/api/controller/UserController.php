<?php

namespace app\modules\api\controller;

use app\library\Inc;
use app\library\Safety;
use app\library\Upload;

use app\model\User;
use app\model\UserInfo;

class UserController extends UserBase {

  static private $imgDir = 'upload/user/img/';

  /* 用户登录 */
  function loginAction(){
    $uname = $this->request->get('uname','string');
    $passwd = $this->request->get('passwd','string');
    // 用户名是否合法
    if(Safety::isRight('uname',$uname)!==true && Safety::isRight('tel',$uname)!==true && Safety::isRight('email',$uname)!==true){
      return self::getJSON(['code'=>4000]);
    }
    $builder = $this->modelsManager->createBuilder();
    $builder->addfrom('app\model\User', 'a');
    $builder->leftJoin('app\model\UserInfo', 'a.id=b.uid', 'b');
    $builder->where(
      '(a.uname = :uname: OR a.tel = :uname: OR a.email= :uname:) AND a.password = :passwd:',
      ['uname'=>$uname, 'passwd'=>md5($passwd)]
    );
    $builder->columns('a.id as uid,state,position,nickname,name,gender,birthday,img');
    $uData = $builder->getQuery()->execute()->toArray();
    // 是否存在
    if(!$uData) return self::getJSON(['code'=>4010]);
    // 是否禁用
    $uData = (Object)$uData[0];
    $uData->img = $uData->img?$this->config->img_url.$uData->img:'';
    if($uData->state!='1') return self::getJSON(['code'=>4011]);
    unset($uData->state);
    // 登录时间
    $model = User::findFirst('id='.$uData->uid);
    $model->ltime = date('YmdHis');
    $model->save();
    // 结果
    return self::getJSON(['code'=>0,'info'=>$uData]);
  }

  /* 用户注册 */
  function registerAction(){
    $type = $this->request->get('type','string');
    $val = trim($this->request->get('val'));
    $passwd = trim($this->request->get('passwd'));
    if(empty($type) || empty($val) || Safety::isRight('passwd',$passwd)!==true) return self::getJSON(['code'=>4000]);
    // 验证
    if($type=='uname'){
      $res = Safety::isRight('uname',$val);
      if($res!==true) return self::getJSON(['code'=>4000,'msg'=>$res]);
    }elseif($type=='tel'){
      $res = Safety::isRight('tel',$val);
      if($res!==true) return self::getJSON(['code'=>4000,'msg'=>$res]);
    }elseif($type=='email'){
      $res = Safety::isRight('email',$val);
      if($res!==true) return self::getJSON(['code'=>4000,'msg'=>$res]);
    }else{
      return self::getJSON(['code'=>4000]);
    }
    // 数据
    $model = User::findFirst([$type.'=:val:','bind'=>['val'=>$val]]);
    if(!$model){
      $model = new User();
      $model->id = self::getId();
      $model->$type = $val;
      $model->password = md5($passwd);
    }
    return $model->save()===true?self::getJSON(['code'=>0,'uid'=>$model->id]):self::error(4021);
  }

  /* 修改账号 */
  function changeUnameAction(){
    $type = $this->request->get('type','string');
    $val = trim($this->request->get('val'));
    $uid = $this->request->get('uid','int');
    $passwd = $this->request->get('passwd');
    if(empty($type) || empty($val)) self::error(4000);
    // 数据
    $model = User::findFirst(['id=:uid:','bind'=>['uid'=>$uid]]);
    if(!$model) return self::error(4022);
    // 验证
    if($type!='uname' && $type!='tel' && $type!='email') return self::getJSON(['code'=>4022,'msg'=>'未知类型!']);
    $isUname = Safety::isRight('uname',$val);
    $isTel = Safety::isRight('tel',$val);
    $isEmail = Safety::isRight('email',$val);
    if($type=='uname' && $isUname!==true) return self::getJSON(['code'=>4022,'msg'=>$isUname]);
    elseif($type=='tel' && $isTel!==true) return self::getJSON(['code'=>4022,'msg'=>$isTel]);
    elseif($type=='email' && $isEmail!==true) return self::getJSON(['code'=>4022,'msg'=>$isEmail]);
    // 修改密码
    if($passwd){
      $res = Safety::isRight('passwd',$passwd);
      if($res!==true) return self::getJSON(['code'=>4022,'msg'=>$res]);
      $model->password=md5($passwd);
    }
    // 更新
    $model->$type=$val;
    $model->utime=date('YmdHis');
    return $model->save()===true?self::getJSON(['code'=>0,'uid'=>$uid]):self::error(4022);
  }

  /* 获取用户ID */
  function getIDAction(){
    $uname = $this->request->get('uname');
    if(empty($uname)) self::error(4000);
    // 验证
    $isUname = Safety::isRight('uname',$uname);
    $isTel = Safety::isRight('tel',$uname);
    $isEmail = Safety::isRight('email',$uname);
    if($isUname!==true && $isTel!==true && $isEmail!==true){
      return self::getJSON(['code'=>4022,'msg'=>'账号错误!']);
    }
    // 查询
    $user = User::findFirst(['uname=:uname: OR tel=:uname: OR email=:uname:','bind'=>['uname'=>$uname],'columns'=>'id']);
    return $user?self::getJSON(['code'=>0,'uid'=>$user->id]):self::getJSON(['code'=>0,'uid'=>'']);
  }

  /* 用户信息-查询 */
  function infoAction(){
    $uid = $this->request->get('uid','int');
    if(empty($uid)) return self::getJSON(['code'=>4000]);
    // 基础
    $user = User::findFirst(['id=:uid:','bind'=>['uid'=>$uid],'columns'=>'uname,tel,email,rtime,ltime,state']);
    if(!$user) return self::getJSON(['code'=>4001,'msg'=>'该用户不存在!']);
    // 详细
    $uinfo = UserInfo::findFirst(['uid=:uid:','bind'=>['uid'=>$uid]]);
    if(!$uinfo){
      $uinfo = new UserInfo();
      $uinfo->uid = $uid;
      $uinfo->save();
    };
    $uinfo->img = $uinfo->img?$this->config->img_url.$uinfo->img:'';
    $data = array_merge($user->toArray(),$uinfo->toArray());
    return self::getJSON(['code'=>0,'info'=>$data]);
  }

  /* 用户信息-编辑 */
  function infoEditAction(){
    $uid = $this->request->get('uid','int');
    $data = $this->request->get('data');
    if(empty($data)) return self::getJSON(['code'=>4000]);
    // 是否合作者
    $isClient = User::findFirst(['id=:uid:','bind'=>['uid'=>$uid]]);
    if(!$isClient) return self::getJSON(['code'=>4000,'msg'=>'无权修改该用户信息']);
    // 数据
    $data = json_decode($data);
    $model = UserInfo::findFirst(['uid=:uid:','bind'=>['uid'=>$uid]]);
    if(!$model){
      $model = new UserInfo();
      $model->uid = $uid;
    }
    foreach($data as $key=>$val){
      if($key=='id') continue;
      if($key=='uid') continue;
      if($key=='img') continue;
      $model->$key = trim($val);
    }
    return $model->save()==true?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 修改密码 */
  function passwdAction(){
    $uid = $this->request->get('uid','int');
    $old = $this->request->get('old','string');
    $pwd = $this->request->get('pwd','string');
    // 验证
    if($old==$pwd) return self::getJSON(['code'=>4000,'msg'=>'不能与原密码相同！']);
    if(Safety::isRight('passwd',$old)!==true || Safety::isRight('passwd',$pwd)!==true){
      return self::getJSON(['code'=>4000,'msg'=>'密码格式错误！']);
    }
    // 模型
    $model = User::findFirst([
      'id=:uid: AND password=:pwd:',
      'bind'=>['uid'=>$uid,'pwd'=>md5($old)]
    ]);
    if(!$model) return self::getJSON(['code'=>4000,'msg'=>'原密码错误或无权修改！']);
    $model->password = md5($pwd);
    return $model->save()==true?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 上传头像 */
  function upImgAction(){
    $uid = $this->request->get('uid','int');
    $data = $this->request->get('data');
    if(empty($data)) return self::getJSON(['code'=>4000]);
    // 是否合作者
    $isClient = User::findFirst(['id=:uid:','bind'=>['uid'=>$uid]]);
    if(!$isClient) return self::getJSON(['code'=>4000,'msg'=>'无权修改该用户信息']);
    // 上传
    $up = Upload::base64(self::$imgDir,$data);
    if ($up['status']==false) return self::getJSON(['code'=>4030]);
    $model = UserInfo::findFirst(['uid=:uid:','bind'=>['uid'=>$uid]]);
    if(!$model){
      $model = new UserInfo();
      $model->uid = $uid;
    }
    // 保存头像
    $tmp = isset($model->img)?$model->img:'';
    $model->img = self::$imgDir.$up['file'];
    if($model->save()==true){
      if($tmp) @unlink($tmp);
      return self::getJSON(['code'=>0,'img'=>$this->config->img_url.self::$imgDir.$up['file']]);
    }else{
      return self::getJSON(['code'=>4030]);
    }
  }

}