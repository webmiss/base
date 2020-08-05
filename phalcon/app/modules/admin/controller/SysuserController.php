<?php

namespace app\modules\admin\controller;

use app\library\Inc;
use app\library\Safety;

use app\model\User;
use app\model\UserInfo;

class SysUserController extends UserBase {

  /* 列表 */
  function listAction(){
    // 条件
    $data = self::getSeaWhere()['data'];
    $where = '';
    if(isset($data['uname']) && !empty($data['uname'])){
      $where = '(a.uname LIKE "%'.$data['uname'].'%" OR a.tel LIKE "%'.$data['uname'].'%" OR a.email LIKE "%'.$data['uname'].'%")';
    }
    // 分页
    $page = $this->request->get('page','int');
    $limit = $this->request->get('limit','int');
    $start = ($page-1)*$limit;
    // 查询数据
    $builder = $this->modelsManager->createBuilder();
    $builder->addfrom('app\model\User', 'a');
    $builder->leftJoin('app\model\UserInfo', 'a.id=b.uid', 'b');
    $builder->where($where);
    $builder->columns('
      a.id as uid,a.uname as uname,a.email as email,a.tel as tel,a.state as state,
      a.rtime as rtime,a.ltime as ltime,a.utime as utime,
      b.nickname as nickname,b.position as position,b.name as name,b.gender as gender,b.birthday as birthday,b.img as img
    ');
    $builder->orderBy('a.id DESC');
    // 数据
    $total = $builder->getQuery()->execute()->count();
    $builder->limit($limit,$start);
    $data = $builder->getQuery()->execute()->toArray();
    // 状态
    foreach ($data as $key => $val) {
      $data[$key]['age'] = $val['birthday']?Inc::getAge($val['birthday']):'';
      $data[$key]['state'] = $val['state']?true:false;
    }
    return self::getJSON(['code'=>0,'list'=>$data,'total'=>$total]);
  }

  /* 添加 */
  function addAction(){
    $data = $this->request->get('data');
    if(empty($data)) return self::getJSON(['code'=>4000]);
    $data = json_decode($data);
    // 验证
    $msg = Safety::isRight('tel',$data->tel);
    if($msg!==true) return self::getJSON(['code'=>4000,'msg'=>$msg]);
    $msg = Safety::isRight('passwd',$data->passwd);
    if($msg!==true) return self::getJSON(['code'=>4000,'msg'=>$msg]);
    // 是否存在
    $res = User::findFirst(['tel=:tel:','bind'=>['tel'=>$data->tel]]);
    if($res) return self::getJSON(['code'=>0,'msg'=>'已存在该系统!']);
    // 注册
    $model = new User();
    $model->id = self::getId();
    $model->tel = $data->tel;
    $model->password = md5($data->passwd);
    // 结果
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 编辑 */
  function editAction(){
    $data = $this->request->get('data');
    if(!$data || empty($data)) return self::getJSON(['code'=>4000]);
    $data = json_decode($data);
    // 验证
    $msg = Safety::isRight('tel',$data->tel);
    if($msg!==true) return self::getJSON(['code'=>4000,'msg'=>$msg]);
    // 是否存在
    $model = User::findFirst(['id=:uid:','bind'=>['uid'=>$data->uid]]);
    if(!$model) return self::getJSON(['code'=>0,'msg'=>'用户不存在!']);
    // 是否管理员
    if(self::isAdmin($model->id)) return self::getJSON(['code'=>4001,'msg'=>'无权修改!']);
    // 修改账户、密码
    $model->tel = $data->tel;
    if($data->passwd){
      $msg = Safety::isRight('passwd',$data->passwd);
      if($msg!==true) return self::getJSON(['code'=>4000,'msg'=>$msg]);
      $model->password = md5($data->passwd);
    }
    // 结果
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 删除 */
  function delAction(){
    $data = $this->request->get('data','string');
    if(empty($data)) return self::getJSON(['code'=>4000]);
    // 数据处理
    $id = trim($data,',');
    // 执行
    $model = User::find(['id in('.$id.')']);
    $info = UserInfo::find(['uid in('.$id.')']);
    return $model->delete()?self::getJSON(['code'=>0]):self::error(4023);
  }

  /* 状态 */
  function stateAction($type){
    $uid = $this->request->get('uid','int');
    $state = $this->request->get('state','int');
    if(empty($uid)) return self::getJSON(['code'=>4000]);
    // 数据
    $model = User::findFirst(['id=:uid:','bind'=>['uid'=>$uid]]);
    if(!$model) return self::getJSON(['code'=>4001,'msg'=>'无效用户!']);
    if($type=='state') $model->state = $state;
    // 是否管理员
    if(self::isAdmin($model->id)) return self::getJSON(['code'=>4001,'msg'=>'无权修改!']);
    // 结果
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 用户信息 */
  function uinfoAction(){
    $uid = $this->request->get('uid','int');
    $data = $this->request->get('data');
    if(empty($uid)) return self::getJSON(['code'=>4000]);
    $data = json_decode($data);
    // 是否存在
    $model = UserInfo::findFirst(['uid=:uid:','bind'=>['uid'=>$uid]]);
    if(!$model) return self::getJSON(['code'=>4001,'msg'=>'无效用户!']);
    // 是否管理员
    if(self::isAdmin($model->uid)) return self::getJSON(['code'=>4001,'msg'=>'无权修改!']);
    // 数据
    foreach($data as $key=>$val){
      if($key=='id') continue;
      $model->$key = trim($val);
    }
    // 结果
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 是否管理员 */
  private function isAdmin($uid){
    return $uid=='1'&&self::$token->uid!='1'?true:false;
  }
  
}