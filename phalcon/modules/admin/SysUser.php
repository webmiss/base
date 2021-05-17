<?php
namespace App\Admin;

use Config\Env;
use Service\Base;
use Service\Data;
use Service\AdminToken;
use Library\Safety;
use Library\Redis;
use Model\User;
use Model\UserInfo;
use Model\ApiPerm;
use Model\SysRole;
use Model\SysPerm;
use Model\ApiRole;
use Util\Util;

class SysUser extends Base {

  /* 列表 */
	static function List(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $data = self::Post('data');
    $page = self::Post('page');
    $limit = self::Post('limit');
    if(empty($data) || empty($page) || empty($limit)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    $param = json_decode($data);
    $uname = isset($param->uname)?trim($param->uname):'';
    // 统计
    $model = new User();
    $model->Columns('count(*) AS num');
    $model->Where('uname LIKE ? OR tel LIKE ? OR email LIKE ?', '%'.$uname.'%', '%'.$uname.'%', '%'.$uname.'%');
    $total = $model->FindFirst();
    // 查询
    $model->Table('user as a');
    $model->LeftJoin('user_info as b', 'a.id=b.uid');
    $model->LeftJoin('sys_perm as c', 'a.id=c.uid');
    $model->LeftJoin('api_perm as d', 'a.id=d.uid');
    $model->Columns(
      'a.id AS uid', 'a.uname', 'a.email', 'a.tel', 'a.state', 'FROM_UNIXTIME(a.rtime) as rtime', 'FROM_UNIXTIME(a.ltime) as ltime', 'FROM_UNIXTIME(a.utime) as utime',
      'b.nickname', 'b.position', 'b.name', 'b.gender', 'FROM_UNIXTIME(b.birthday, "%Y-%m-%d") as birthday', 'b.img',
      'c.role AS sys_role', 'c.perm AS sys_perm',
      'd.role AS api_role', 'd.perm AS api_perm'
    );
    $model->Where('a.uname LIKE ? OR a.tel LIKE ? OR a.email LIKE ?', '%'.$uname.'%', '%'.$uname.'%', '%'.$uname.'%');
    $model->Order('a.id DESC');
    $model->Page($page, $limit);
    $list = $model->Find();
    // 数据
    foreach ($list as $key => $val) {
      $list[$key]['state'] = $val['state']?true:false;
      $list[$key]['img'] = Data::Img($val['img']);
      if(!$val['sys_role']) $list[$key]['sys_role']='';
      if(!$val['sys_perm']) $list[$key]['sys_perm']='';
    }
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功','list'=>$list,'total'=>(int)$total['num']]);
  }

  /* 添加 */
  static function Add(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $data = self::Post('data');
    if(empty($data)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    $param = json_decode($data);
    $tel = isset($param->tel)?trim($param->tel):'';
    $passwd = isset($param->passwd)?$param->passwd:Env::$password;
    // 验证
    if(!Safety::IsRight('tel', $tel)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'手机号码有误!']);
    }
    if(!Safety::IsRight('passwd', $passwd)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'密码为6～16位!']);
    }
    // 是否存在
    $m = new User();
    $m->Columns('id');
    $m->Where('tel=?', $tel);
    $user = $m->FindFirst();
    if(!empty($user)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'该用户已存在!']);
    }
    // 新增
    $uid = Data::Mist('ID');
    $conn = $m->DBConn();
    try{
      $conn->begin();
      // 用户
      $m1 = new User();
      $m1->Values(['id'=>$uid, 'tel'=>$tel, 'password'=>md5($passwd)]);
      list($sql, $args) = $m1->InsertSql();
      $conn->execute($sql, $args);
      // 详情
      $m2 = new UserInfo();
      $m2->Values(['uid'=>$uid]);
      list($sql, $args) = $m2->InsertSql();
      $conn->execute($sql, $args);
      // 权限
      $m3 = new ApiPerm();
      $m3->Values(['uid'=>$uid, 'role'=>1, 'utime'=>time()]);
      list($sql, $args) = $m3->InsertSql();
      $conn->execute($sql, $args);
      // 提交
      $conn->commit();
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } catch (\Exception $e) {
      $conn->rollback();
      return self::GetJSON(['code'=>5000,'msg'=>'添加失败!']);
    }
  }

  /* 编辑 */
  static function Edit(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $uid = self::Post('uid');
    $data = self::Post('data');
    if(empty($uid) || empty($data)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    $param = json_decode($data);
    $tel = isset($param->tel)?trim($param->tel):'';
    $passwd = isset($param->passwd)?$param->passwd:'';
    // 验证
    if(!Safety::IsRight('tel', $tel)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'手机号码有误!']);
    }
    // 是否存在
    $m = new User();
    $m->Columns('id');
    $m->Where('tel=?', $tel);
    $user = $m->FindFirst();
    if(!empty($user)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'该用户已存在!']);
    }
    // 更新
    $uData = ['tel'=>$tel];
    if($passwd!='') $uData['password'] = md5($passwd);
    $m->Set($uData);
    $m->Where('id=?', $uid);
    if($m->Update()){
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

  /* 删除 */
  static function Del(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $data = self::Post('data');
    if(empty($data)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    $param = json_decode($data);
    $ids = implode(',',$param);
    // 执行
    $m1 = new User();
    $m1->Where('id in('.$ids.')');
    $m2 = new UserInfo();
    $m2->Where('uid in('.$ids.')');
    $m3 = new SysPerm();
    $m3->Where('uid in('.$ids.')');
    $m4 = new ApiPerm();
    $m4->Where('uid in('.$ids.')');
    if($m1->Delete() && $m2->Delete() && $m3->Delete() && $m4->Delete()){
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'删除失败!']);
    }
  }

  /* 状态 */
  static function State(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    $tData = AdminToken::Token($token);
    // 参数
    $uid = self::Post('uid');
    $state = self::Post('state');
    $state = $state=='1'?'1':'0';
    if(empty($uid)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 超级管理员
    if($uid==1 && $tData->uid!=1){
      return self::GetJSON(['code'=>4000, 'msg'=>'您不是超级管理员!']);
    }
    // 更新
    $m = new User();
    $m->Set(['state'=>$state]);
    $m->Where('id=?', $uid);
    if($m->Update()){
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

  /* 权限 */
  static function Perm(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    $tData = AdminToken::Token($token);
    // 参数
    $uid = self::Post('uid');
    $type = self::Post('type');
    $role = self::Post('role');
    $perm = self::Post('perm');
    if(empty($uid) || empty($type)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 超级管理员
    if($uid==1 && $tData->uid!=1){
      return self::GetJSON(['code'=>4000, 'msg'=>'您不是超级管理员!']);
    }
    // 类型
    $uData = ['perm'=>$perm, 'role'=>$role, 'utime'=>time()];
    if($type=='admin'){
      // 系统权限
      $m = new SysPerm();
      $m->Set($uData);
      $m->Where('uid=?', $uid);
      if($m->Update()){
        // 角色权限
        if(empty($perm)){
          $m1 = new SysRole();
          $m1->Columns('perm');
          $m1->Where('id=?', $role);
          $data = $m1->FindFirst();
          $perm = isset($data['perm'])?$data['perm']:'';
        }
        // 更新权限
        self::_setPerm(Env::$admin_token_prefix.'_perm_'.$uid, $perm);
        return self::GetJSON(['code'=>0,'msg'=>'成功']);
      } else {
        return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
      }
    }else if($type=='api'){
      // API权限
      $m = new ApiPerm();
      $m->Set($uData);
      $m->Where('uid=?', $uid);
      if($m->Update()){
        // 角色权限
        if(empty($perm)){
          $m1 = new ApiRole();
          $m1->Columns('perm');
          $m1->Where('id=?', $role);
          $data = $m1->FindFirst();
          $perm = isset($data['perm'])?$data['perm']:'';
        }
        // 更新权限
        self::_setPerm(Env::$api_token_prefix.'_perm_'.$uid, $perm);
        return self::GetJSON(['code'=>0,'msg'=>'成功']);
      } else {
        return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
      }
    }else{
      return self::GetJSON(['code'=>4000, 'msg'=>'类型错误!']);
    }
  }
  // 更新权限
  private static function _setPerm(string $key, string $perm) {
    $redis = new Redis();
    $redis->Set($key, $perm);
    $redis->Close();
  }

  /* 个人信息 */
  static function Info() {
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $uid = self::Post('uid');
    $data = self::Post('data');
    if(empty($uid) || empty($data)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 数据
    $param = json_decode($data);
    $info = [
      'nickname'=> isset($param->nickname)?trim($param->nickname):'',
      'name'=> isset($param->name)?trim($param->name):'',
      'gender'=> isset($param->gender)?trim($param->gender):'',
      'birthday'=> isset($param->birthday)?Util::Strtotime($param->birthday):0,
      'position'=> isset($param->position)?trim($param->position):'',
    ];
    // 执行
    $m = new UserInfo();
    $m->Set($info);
    $m->Where('uid=?', $uid);
    if($m->Update()){
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

}