<?php
namespace app\modules\admin\controller;

use app\Env;
use app\common\Base;
use app\common\AdminToken;
use app\common\Data;
use app\library\Safety;
use app\model\User;
use app\model\UserInfo;

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
    $uname = trim($data->uname);
    $where = 'a.uname LIKE :uname: OR a.tel LIKE :uname: OR a.email LIKE :uname:';
    $bind = ['uname'=>"%$uname%"];
    // 查询
    $builder = $this->modelsManager->createBuilder();
    $builder->addfrom('app\model\User', 'a');
    $builder->leftJoin('app\model\UserInfo', 'a.id=b.uid', 'b');
    $builder->where($where,$bind);
    $builder->columns('
      a.id AS uid, a.uname, a.email, a.tel, a.state, a.rtime, a.ltime, a.utime,
      b.nickname, b.position, b.name, b.gender, b.birthday, b.img
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
    if(empty($data) || !isset($data->tel) || empty($data->tel)){
      return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    }
    $tel = trim($data->tel);
    $passwd = $data->passwd?md5($data->passwd):md5('123456');
    // 验证手机
    if(!Safety::isRight('tel',$tel)){
      return self::getJSON(['code'=>4000,'msg'=>'手机号码有误!']);
    }
    // 是否存在
    $res = User::findFirst(['tel=:tel:','bind'=>['tel'=>$tel]]);
    if($res) return self::getJSON(['code'=>4000,'msg'=>'该用户已存在!']);
    // 保存
    $model = new User();
    $model->id = Data::getId();
    $model->tel = $tel;
    $model->password = $passwd;
    $model->rtime = date('YmdHis');
    // 结果
    if($model->save()){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'添加失败!']);
    }
  }

  /* 编辑 */
  function editAction(){
    // 参数
    $data = trim($this->request->get('data'));
    $data = json_decode($data);
    if(empty($data) || !isset($data->tel) || empty($data->tel)){
      return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    }
    $uid = trim($this->request->get('uid'));
    $tel = trim($data->tel);
    $passwd = $data->passwd?md5($data->passwd):'';
    // 验证手机
    if(!Safety::isRight('tel',$tel)){
      return self::getJSON(['code'=>4000,'msg'=>'手机号码有误!']);
    }
    // 是否存在
    $res = User::findFirst(['tel=:tel:','bind'=>['tel'=>$tel]]);
    if($res){
      if(!empty($passwd)){
        $res->password = $passwd;
        if($res->save()) return self::getJSON(['code'=>0,'msg'=>'成功']);
        else return self::getJSON(['code'=>5000,'msg'=>'更新密码失败!']);
      }else{
        return self::getJSON(['code'=>4000,'msg'=>'密码为6-16位字符!']);
      }
    }
    // 修改手机
    $model = User::findFirst(['id=:uid:','bind'=>['uid'=>$uid]]);
    $model->tel = $tel;
    if(!empty($passwd)) $model->password = $passwd;
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
    $model = User::find('id in('.$ids.')');
    $uinfo = UserInfo::find('uid in('.$ids.')');
    // 结果
    if($model->delete()&&$uinfo->delete()){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'删除失败!']);
    }
  }

  /* 状态 */
  function stateAction(){
    // 参数
    $uid = trim($this->request->get('uid','String'));
    $state = trim($this->request->get('state','String'));
    if(empty($uid)) return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    // 管理员
    if($uid=='1') return self::getJSON(['code'=>4000,'msg'=>'禁止修改系统管理员!']);
    // 更改
    $model = User::findFirst(['id=:uid:','bind'=>['uid'=>$uid]]);
    $model->state = $state=='1'?'1':'0';
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
    // 是否存在
    $model = UserInfo::findFirst(['uid=:uid:','bind'=>['uid'=>$uid]]);
    if(!$model) $model = new UserInfo();
    // 数据
    $arr = ['uid'];
    foreach($data as $key=>$val){
      if(in_array($key,$arr)) continue;
      $model->$key = trim($val);
    }
    $model->uid = $uid;
    // 结果
    if($model->save()){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

}