<?php
namespace App\Admin;

use Base\Base;
use Config\Env;
use Library\Safety;
use Library\Redis;
use Service\AdminToken;
use Model\User as UserModel;
use Model\UserInfo;
use Util\Data;

class User extends Base {

  /* 登录 */
	static function Login(){
    $uname = self::Post('uname');
    $passwd = self::Post('passwd');
    // 验证用户名
    if(!Safety::isRight('uname',$uname) && !Safety::isRight('tel',$uname) && !Safety::isRight('email',$uname)){
      return self::GetJSON(['code'=>4000, 'msg'=>'请输入用户名/手机/邮箱!']);
    }
    // 密码长度
    if(!Safety::isRight('passwd',$passwd)){
      return self::GetJSON(['code'=>4000, 'msg'=>'请输入6~16位密码!']);
    }
    // 查询
    $model = new UserModel();
    $model->Table('user AS a');
    $model->LeftJoin('user_info AS b', 'a.id=b.uid');
    $model->LeftJoin('sys_perm AS c', 'a.id=c.uid');
    $model->Columns('a.id', 'a.state', 'b.position', 'b.nickname', 'b.name', 'b.gender', 'b.birthday', 'b.img', 'c.role', 'c.perm');
    $model->Where(
      '(a.uname=? OR a.tel=? OR a.email=?) AND a.password=?',
      $uname, $uname, $uname, md5($passwd)
    );
    $data = $model->FindFirst();
    // 是否存在
    if(empty($data)) return self::GetJSON(['code'=>4000,'msg'=>'帐号或密码错误!']);
    // 是否禁用
    if($data['state']!='1') return self::GetJSON(['code'=>4000,'msg'=>'该用户已被禁用!']);
    // 权限
    $perm = $data['role'];
    if($data['perm']) $perm=$data['perm'];
    if(!$perm) return self::GetJSON(['code'=>4000,'msg'=>'该用户不允许登录!']);
    $redis = new Redis();
    $key = Env::$admin_token_prefix.'_perm_'.$data['id'];
    $redis->Set($key, $perm);
    $redis->Expire($key, Env::$admin_token_time);
    $redis->Close();
    // 登录时间
    $model->Table('user');
    $model->Set(['ltime'=>date('YmdHis')]);
    $model->Where('id=?', $data['id']);
    $model->Update();
    // 返回
    return self::GetJSON([
      'perm'=> $perm,
      'code'=> 0,
      'msg'=> '成功',
      'token'=> AdminToken::create(['uid'=>$data['id'], 'uname'=>$uname]),
      'uinfo'=>[
        'uid'=> $data['id'],
        'uname'=> $uname,
        'position'=> $data['position'],
        'nickname'=> $data['nickname'],
        'name'=> $data['name'],
        'gender'=> $data['gender'],
        'img'=> !empty($data['img'])?Env::$base_url.$data['img']:'',
      ],
    ]);
  }

  /* Token验证 */
	static function Token(){
    // 验证 $_SERVER['REQUEST_URI']
    $token = self::Post('token');
    $msg = AdminToken::verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $uinfo = self::Post('uinfo');
    if($uinfo!='1') return self::GetJSON(['code'=>0, 'msg'=>'成功']);
    // 用户信息
    $tData = AdminToken::token($token);
    $model = new UserInfo();
    $model->Columns('nickname','position','name','img');
    $model->Where('uid=?',$tData->uid);
    $info = $model->FindFirst();
    $info['uname'] = $tData->uname;
    $info['img'] = Data::img($info['img']);
    return self::GetJSON(['code'=>0, 'msg'=>'成功', 'uinfo'=>$info]);
  }

}