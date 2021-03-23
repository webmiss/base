<?php
namespace App\Api;

use Base\Base;
use Base\Data;
use Config\Env;
use Library\Safety;
use Library\Redis;
use Service\ApiToken;
use Model\User as UserModel;
use Model\UserInfo;

class User extends Base {

  /* 登录 */
	static function Login(){
    $uname = self::Post('uname');
    $passwd = self::Post('passwd');
    // 验证用户名
    if(!Safety::isRight('tel',$uname)){
      return self::GetJSON(['code'=>4000, 'msg'=>'请输手机号码!']);
    }
    // 密码长度
    if(!Safety::isRight('passwd',$passwd)){
      return self::GetJSON(['code'=>4000, 'msg'=>'请输入6~16位密码!']);
    }
    // 查询
    $model = new UserModel();
    $model->Table('user AS a');
    $model->LeftJoin('user_info AS b', 'a.id=b.uid');
    $model->LeftJoin('api_perm AS c', 'a.id=c.uid');
    $model->LeftJoin('api_role AS d', 'c.role=d.id');
    $model->Columns('a.id', 'a.state', 'b.position', 'b.nickname', 'b.name', 'b.gender', 'b.birthday', 'b.img', 'c.perm', 'd.perm as role_perm');
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
    $perm = $data['role_perm'];
    self::Print('Perm', $perm);
    if($data['perm']) $perm=$data['perm'];
    if(!$perm) return self::GetJSON(['code'=>4000,'msg'=>'该用户不允许登录!']);
    $redis = new Redis();
    $key = Env::$api_token_prefix.'_perm_'.$data['id'];
    $redis->Set($key, $perm);
    $redis->Expire($key, Env::$api_token_time);
    $redis->Close();
    // 登录时间
    $model->Table('user');
    $model->Set(['ltime'=>time()]);
    $model->Where('id=?', $data['id']);
    $model->Update();
    // 返回
    return self::GetJSON([
      'code'=> 0,
      'msg'=> '成功',
      'token'=> ApiToken::create(['uid'=>$data['id'], 'uname'=>$uname]),
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
    // 验证
    $token = self::Post('token');
    $msg = ApiToken::verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $uinfo = self::Post('uinfo');
    $tData = ApiToken::token($token);
    if($uinfo!='1') return self::GetJSON(['code'=>0, 'msg'=>'成功', 'token_time'=>$tData->time]);
    // 用户信息
    $model = new UserInfo();
    $model->Columns('nickname','position','name','img');
    $model->Where('uid=?',$tData->uid);
    $info = $model->FindFirst();
    $info['uname'] = $tData->uname;
    $info['img'] = Data::img($info['img']);
    return self::GetJSON(['code'=>0, 'msg'=>'成功', 'token_time'=>$tData->time, 'uinfo'=>$info]);
  }

}