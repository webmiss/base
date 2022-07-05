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
	static function List() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $data = self::JsonName($json, 'data');
    $page = self::JsonName($json, 'page');
    $limit = self::JsonName($json, 'limit');
    $order = self::JsonName($json, 'order');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($data) || empty($page) || empty($limit)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 条件
    $param = json_decode($data);
    list($where, $whereData) = self::getWhere($param);
    // 统计
    $m = new User();
    $m->Columns('count(*) AS num');
    $m->Table('user as a');
    $m->LeftJoin('user_info as b', 'a.id=b.uid');
    $m->Where($where, ...$whereData);
    $total = $m->FindFirst();
    // 查询
    $m->Table('user as a');
    $m->LeftJoin('user_info as b', 'a.id=b.uid');
    $m->LeftJoin('sys_perm as c', 'a.id=c.uid');
    $m->LeftJoin('api_perm as d', 'a.id=d.uid');
    $m->Columns(
      'a.id AS uid', 'a.uname', 'a.email', 'a.tel', 'a.state', 'FROM_UNIXTIME(a.rtime) as rtime', 'FROM_UNIXTIME(a.ltime) as ltime', 'FROM_UNIXTIME(a.utime) as utime',
      'b.nickname', 'b.department', 'b.position', 'b.name', 'b.gender', 'b.img', 'FROM_UNIXTIME(b.birthday, "%Y-%m-%d") as birthday',
      'c.role AS sys_role', 'c.perm AS sys_perm',
      'd.role AS api_role', 'd.perm AS api_perm'
    );
    $m->Where($where, ...$whereData);
    $m->Order($order?:'a.id DESC');
    $m->Page($page, $limit);
    $list = $m->Find();
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
  /* 搜索条件 */
  static private function getWhere(object $param): array {
    // 参数
    $uname = isset($param->uname)?trim($param->uname):'';
    $nickname = isset($param->nickname)?trim($param->nickname):'';
    $name = isset($param->name)?trim($param->name):'';
    $department = isset($param->department)?trim($param->department):'';
    $position = isset($param->position)?trim($param->position):'';
    // 条件
    $where = '(a.uname LIKE ? OR a.tel LIKE ? OR a.email LIKE ?) AND b.nickname LIKE ? AND b.name LIKE ? AND b.department LIKE ? AND b.position LIKE ?';
    $whereData = ['%'.$uname.'%', '%'.$uname.'%', '%'.$uname.'%', '%'.$nickname.'%', '%'.$name.'%', '%'.$department.'%', '%'.$position.'%'];
    return [$where, $whereData];
  }

  /* 添加 */
  static function Add() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $data = self::JsonName($json, 'data');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($data)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 数据
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
      $conn->beginTransaction();
      // 用户
      $m1 = new User();
      $m1->Values(['id'=>$uid, 'tel'=>$tel, 'password'=>md5($passwd)]);
      list($sql, $args) = $m1->InsertSQL();
      $m->Exec($conn, $sql, $args);
      // 详情
      $m2 = new UserInfo();
      $m2->Values(['uid'=>$uid]);
      list($sql, $args) = $m2->InsertSQL();
      $m->Exec($conn, $sql, $args);
      // 权限-System
      $m3 = new SysPerm();
      $m3->Values(['uid'=>$uid, 'role'=>1, 'utime'=>time()]);
      list($sql, $args) = $m3->InsertSQL();
      $m->Exec($conn, $sql, $args);
      // 权限-Api
      $m4 = new ApiPerm();
      $m4->Values(['uid'=>$uid, 'role'=>1, 'utime'=>time()]);
      list($sql, $args) = $m4->InsertSQL();
      $m->Exec($conn, $sql, $args);
      // 提交
      $conn->commit();
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } catch (\Exception $e) {
      $conn->rollBack();
      return self::GetJSON(['code'=>5000,'msg'=>'添加失败!']);
    }
  }

  /* 编辑 */
  static function Edit() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $uid = self::JsonName($json, 'uid');
    $data = self::JsonName($json, 'data');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($uid) || empty($data)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 数据
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
    if(empty($user)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'该用户不存在!']);
    }
    // 模型
    $uData = ['tel'=>$tel];
    if($passwd!='') $uData['password'] = md5($passwd);
    $m->Set($uData);
    $m->Where('id=?', $uid);
    if($m->Update()) {
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

  /* 删除 */
  static function Del() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $data = self::JsonName($json, 'data');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($data)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 数据
    $param = json_decode($data);
    $ids = implode(',',$param);
    // 模型
    $m1 = new User();
    $m1->Where('id in('.$ids.')');
    $m2 = new UserInfo();
    $m2->Where('uid in('.$ids.')');
    $m3 = new SysPerm();
    $m3->Where('uid in('.$ids.')');
    $m4 = new ApiPerm();
    $m4->Where('uid in('.$ids.')');
    if($m1->Delete() && $m2->Delete() && $m3->Delete() && $m4->Delete()) {
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'删除失败!']);
    }
  }

  /* 状态 */
  static function State(){
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $uid = self::JsonName($json, 'uid');
    $state = self::JsonName($json, 'state');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($uid)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 超级管理员
    $tData = AdminToken::Token($token);
    if($uid==1 && $tData->uid!=1){
      return self::GetJSON(['code'=>4000, 'msg'=>'您不是超级管理员!']);
    }
    // 模型
    $state = $state=='1'?'1':'0';
    $m = new User();
    $m->Set(['state'=>$state]);
    $m->Where('id=?', $uid);
    if($m->Update()) {
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

  /* 权限 */
  static function Perm(){
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $type = self::JsonName($json, 'type');
    $uid = self::JsonName($json, 'uid');
    $role = self::JsonName($json, 'role');
    $perm = self::JsonName($json, 'perm');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($type) || empty($uid)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 超级管理员
    $tData = AdminToken::Token($token);
    if($uid==1 && $tData->uid!=1){
      return self::GetJSON(['code'=>4000, 'msg'=>'您不是超级管理员!']);
    }
    // 类型
    if($type=='admin' && self::_permSys($uid, $role, $perm)){
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    }else if($type=='api' && self::_permApi($uid, $role, $perm)){
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }
  // 权限-System
  private static function _permSys($uid, $role, $perm) {
    // 数据
    $uData = ['perm'=>$perm, 'role'=>$role, 'utime'=>time()];
    // 模型
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
      return self::_setPerm(Env::$admin_token_prefix.'_perm_'.$uid, $perm);
    }
    return false;
  }
  // 权限-System
  private static function _permApi($uid, $role, $perm) {
    // 数据
    $uData = ['perm'=>$perm, 'role'=>$role, 'utime'=>time()];
    // 模型
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
      return self::_setPerm(Env::$api_token_prefix.'_perm_'.$uid, $perm);
    }
    return false;
  }
  // 更新权限
  private static function _setPerm(string $key, string $perm): bool {
    $redis = new Redis();
    $redis->Set($key, $perm);
    $redis->Close();
    return true;
  }

  /* 个人信息 */
  static function Info() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $uid = self::JsonName($json, 'uid');
    $data = self::JsonName($json, 'data');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($uid) || empty($data)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 数据
    $param = json_decode($data);
    $info = [
      'nickname'=> isset($param->nickname)?trim($param->nickname):'',
      'name'=> isset($param->name)?trim($param->name):'',
      'gender'=> isset($param->gender)?trim($param->gender):'',
      'birthday'=> isset($param->birthday)?Util::StrToTime($param->birthday):0,
      'department'=> isset($param->department)?trim($param->department):'',
      'position'=> isset($param->position)?trim($param->position):'',
    ];
    // 模型
    $m = new UserInfo();
    $m->Set($info);
    $m->Where('uid=?', $uid);
    if($m->Update()) {
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

}