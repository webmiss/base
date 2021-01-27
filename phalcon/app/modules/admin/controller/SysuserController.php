<?php
namespace app\modules\admin\controller;

use app\Env;
use app\common\Base;
use app\common\AdminToken;
use app\common\Data;
use app\model\User;
use app\model\UserInfo;
use app\model\UserPerm;

/* 用户管理 */
class SysUserController extends Base{

  private static $tokenData;

  /* 构造函数 */
  function initialize(){
    parent::initialize();
    // 验证
    self::$tokenData = AdminToken::urlVerify('SysUser');
  }

  /* 列表 */
  function listAction(){
    // 搜索
    $data = json_decode($this->request->get('data'));
    $uname = isset($data->uname)?trim($data->uname):'';
    $where = User::bindWhere(
      'a.uname LIKE "%:uname:%" OR a.tel LIKE "%:uname:%" OR a.email LIKE "%:uname:%"',
      ['uname'=>$uname]
    );
    // 查询
    $builder = $this->modelsManager->createBuilder();
    $builder->addfrom('app\model\User', 'a');
    $builder->leftJoin('app\model\UserInfo', 'a.id=b.uid', 'b');
    $builder->leftJoin('app\model\UserPerm', 'a.id=c.uid', 'c');
    $builder->where($where);
    $builder->columns('
      a.id AS uid, a.uname, a.email, a.tel, a.state, a.rtime, a.ltime, a.utime,
      b.nickname, b.position, b.name, b.gender, b.birthday, b.img,
      c.role, c.state_admin, c.state_app, c.perm
    ');
    $builder->orderBy('a.id DESC');
    // 统计
    $total = $builder->getQuery()->execute()->count();
    // 分页
    $page = $this->request->get('page','int');
    $limit = $this->request->get('limit','int');
    $start = ($page-1)*$limit;
    $builder->limit($limit,$start);
    // 数据
    $list = $builder->getQuery()->execute()->toArray();
    // 状态
    foreach ($list as $key => $val) {
      $list[$key]['state'] = $val['state']?true:false;
      $list[$key]['state_admin'] = $val['state_admin']?true:false;
      $list[$key]['state_app'] = $val['state_app']?true:false;
      $list[$key]['img'] = $val['img']?Env::$base_url.$val['img']:'';
      $list[$key]['birthday'] = $val['birthday']?$val['birthday']:'';
      $list[$key]['rtime'] = $val['rtime']?$val['rtime']:'';
      $list[$key]['ltime'] = $val['ltime']?$val['ltime']:'';
      $list[$key]['utime'] = $val['utime']?$val['utime']:'';
    }
    return self::getJSON(['code'=>0,'msg'=>'成功','list'=>$list,'total'=>$total]);
  }

  /* 添加 */
  function addAction(){
    // 参数
    $data = trim($this->request->get('data'));
    $data = json_decode($data);
    if(empty($data)){
      return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    }
    $id = Data::getId();
    $tel = isset($data->tel)&&!empty($data->tel)?trim($data->tel):'';
    $passwd = isset($data->passwd)&&!empty($data->passwd)?md5($data->passwd):'';
    // 手机号码
    if(empty($tel)){
      return self::getJSON(['code'=>4000,'msg'=>'请输入手机号码!']);
    }
    // 是否存在
    $where = User::bindWhere('tel=:tel:',['tel'=>$tel]);
    $res = User::findFirst($where);
    if($res) return self::getJSON(['code'=>4000,'msg'=>'该用户已存在!']);
    // 事务
    $this->db->begin();
    // 用户
    $m1 = new User();
    $m1->id = $id;
    $m1->tel = $tel;
    $m1->password = $passwd;
    // 信息
    $m2 = new UserInfo();
    $m2->uid = $id;
    // 权限
    $m3 = new UserPerm();
    $m3->uid = $id;
    // 结果
    if($m1->save() && $m2->save() && $m3->save()){
      $this->db->commit();
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      $this->db->rollback();
      return self::getJSON(['code'=>5000,'msg'=>'添加失败!']);
    }
  }

  /* 编辑 */
  function editAction(){
    // 参数
    $data = trim($this->request->get('data'));
    $data = json_decode($data);
    if(empty($data)){
      return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    }
    $uid = trim($this->request->get('uid'));
    $tel = isset($data->tel)&&!empty($data->tel)?trim($data->tel):'';
    $passwd = isset($data->passwd)&&!empty($data->passwd)?md5($data->passwd):'';
    // 手机号码
    if(empty($tel)){
      return self::getJSON(['code'=>4000,'msg'=>'请输入手机号码!']);
    }
    // 是否存在
    $where = User::bindWhere('tel=":tel:"',['tel'=>$tel]);
    $model = User::findFirst($where);
    if($model){
      $model->password = !empty($passwd)?$passwd:$model->password;
    }else{
      $where = User::bindWhere('id=:id:',['id'=>$uid]);
      $model = User::findFirst($where);
      $model->tel = $tel;
      $model->password = $passwd;
    }
    // 结果
    if($model->save()){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'编辑失败!']);
    }
  }

  /* 删除 */
  function deleteAction(){
    // 参数
    $data = trim($this->request->get('data'));
    $data = json_decode($data);
    if(empty($data)) return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    // 管理员
    if(in_array('1',$data))
      return self::getJSON(['code'=>4000,'msg'=>'无法删除系统管理员!']);
    // ID
    $ids = implode(',',$data);
    $w1 = User::bindWhere('id in(:ids:)',['ids'=>$ids]);
    $w2 = User::bindWhere('uid in(:ids:)',['ids'=>$ids]);
    $user = User::find($w1);
    $uinfo = UserInfo::find($w2);
    $perm = UserPerm::find($w2);
    // 结果
    $this->db->begin();
    if($user->delete() && $uinfo->delete() && $perm->delete()){
      $this->db->commit();
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      $this->db->rollback();
      return self::getJSON(['code'=>5000,'msg'=>'删除失败!']);
    }
  }

  /* 状态 */
  function stateAction(){
    // 参数
    $uid = trim($this->request->get('uid','String'));
    $type = trim($this->request->get('type','String'));
    $state = trim($this->request->get('state','String'));
    if(empty($uid) || empty($state)) return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    // 管理员
    if($uid=='1') return self::getJSON(['code'=>4000,'msg'=>'禁止修改系统管理员!']);
    // 更改
    $w1 = User::bindWhere('id=":uid:"',['uid'=>$uid]);
    $w2 = User::bindWhere('uid=":uid:"',['uid'=>$uid]);
    $state = $state=='1'?'1':'0';
    if($type=='state'){
      $model = User::findFirst($w1);
      $model->state = $state;
    }elseif($type=='state_admin'){
      $model = UserPerm::findFirst($w2);
      $model->state_admin = $state;
    }elseif($type=='state_app'){
      $model = UserPerm::findFirst($w2);
      $model->state_app = $state;
    }else{
      return self::getJSON(['code'=>4000,'msg'=>'未知类型!']);
    }
    // 结果
    if($model->save()){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      
      return self::getJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

  /* 用户信息 */
  function infoAction(){
    // 参数
    $data = trim($this->request->get('data'));
    $data = json_decode($data);
    if(empty($data)){
      return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    }
    $uid = trim($this->request->get('uid'));
    // 管理员
    if(self::$tokenData->uid!=1 && $uid==1){
      return self::getJSON(['code'=>4000,'msg'=>'非系统管理员!']);
    }
    // 数据
    $model = UserInfo::findFirst(['uid=:uid:','bind'=>['uid'=>$uid]]);
    $model->nickname = trim($data->nickname);
    $model->name = trim($data->name);
    $model->gender = trim($data->gender);
    $model->birthday = trim($data->birthday);
    $model->position = trim($data->position);
    // 结果
    if($model->save()){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

}