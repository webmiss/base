<?php
namespace App\Admin;

use Config\Env;
use Service\Base;
use Service\Data;
use Service\AdminToken;
use Library\Safety;
use Model\User;

class SysUser extends Base {

  /* 列表 */
	static function List(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, $_SERVER['REQUEST_URI']);
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
    $total = $model->FindFirst();
    // 查询
    $model->Table('user as a');
    $model->LeftJoin('user_info as b', 'a.id=b.uid');
    $model->LeftJoin('sys_perm as c', 'a.id=c.uid');
    $model->Columns(
      'a.id AS uid', 'a.uname', 'a.email', 'a.tel', 'a.state', 'FROM_UNIXTIME(a.rtime) as rtime', 'FROM_UNIXTIME(a.ltime) as ltime', 'FROM_UNIXTIME(a.utime) as utime',
      'b.nickname', 'b.position', 'b.name', 'b.gender', 'FROM_UNIXTIME(b.birthday, "%Y-%m-%d") as birthday', 'b.img',
      'c.role', 'c.perm'
    );
    $model->Where('a.uname LIKE ? OR a.tel LIKE ? OR a.email LIKE ?', '%'.$uname.'%', '%'.$uname.'%', '%'.$uname.'%');
    $model->Order('a.id DESC');
    $model->Page($page, $limit);
    $list = $model->Find();
    // 状态
    foreach ($list as $key => $val) {
      $list[$key]['state'] = $val['state']?true:false;
      $list[$key]['img'] = Data::Img($val['img']);
    }
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功','list'=>$list,'total'=>(int)$total['num']]);
  }

  /* 添加 */
  static function Add(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, $_SERVER['REQUEST_URI']);
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
    $model = new User();
    $model->Columns('id');
    $model->Where('tel=?', $tel);
    $user = $model->FindFirst();
    if(!empty($user)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'该用户已存在!']);
    }
    // 新增
    $uid = Data::GetId('ID');
    self::Print($tel, $passwd, $uid, $user, !empty($user));
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功']);
  }

}