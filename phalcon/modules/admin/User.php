<?php
namespace App\Admin;

use Base\Base;
use Config\Env;
use Library\Safety;
use Model\User as UserModel;

class User extends Base {

  /* 登录 */
	static function Login(){
    $uname = self::Post('uname');
    $passwd = self::Post('passwd');
    // 验证用户名
    if(!Safety::isRight('uname',$uname) && !Safety::isRight('tel',$uname) && !Safety::isRight('email',$uname)){
      return self::GetJSON(['code'=>4000,'msg'=>'请输入用户名/手机/邮箱']);
    }
    // 密码长度
    if(!Safety::isRight('passwd',$passwd)){
      return self::GetJSON(['code'=>4000,'msg'=>'请输入6~16位密码']);
    }
    // 查询
    $model = new UserModel();
    $model->Table('user AS a');
    $model->LeftJoin('user_info AS b', 'a.id=b.uid');
    $model->LeftJoin('user_perm AS c', 'a.id=c.uid');
    $model->Where(
      '(a.uname=? OR a.tel=? OR a.email=?) AND a.password=?',
      $uname, $uname, $uname, md5($passwd)
    );
    $model->Columns('a.id', 'a.state', 'b.position', 'b.nickname', 'b.name', 'b.gender', 'b.birthday', 'b.img', 'c.state_admin');
    $data = $model->FindFirst();
    // 是否存在
    if(empty($data)) return self::GetJSON(['code'=>4000,'msg'=>'帐号或密码错误']);
    // 是否禁用
    if($data['state']!='1') return self::GetJSON(['code'=>4000,'msg'=>'该用户已被禁用']);
    elseif($data['state_admin']!='1') return self::GetJSON(['code'=>4000,'msg'=>'该用户不允许登录']);
    // 登录时间
    $model->Table('user');
    $model->Set(['ltime'=>date('YmdHis')]);
    $model->Where('id=?', $data['id']);
    $model->Update();
    // 返回
    return self::GetJSON([
      'code'=> 10,
      'msg'=> '成功',
      'token'=> 'Token',
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

}