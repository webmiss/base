<?php
namespace App\Admin;

use Base\Base;
use Service\AdminToken;
use Model\UserInfo as UserInfoM;

class UserInfo extends Base {

  private static $imgDir = 'upload/user/img/';

  /* 列表 */
	static function List(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    $tData = AdminToken::token($token);
    // 查询
    $model = new UserInfoM();
    $model->Columns('nickname', 'name', 'gender', 'birthday', 'position', 'img');
    $model->Where('uid=?', $tData->uid);
    $list = $model->FindFirst();
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功','list'=>$list]);
  }

  /* 编辑 */
  static function Edit(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    $tData = AdminToken::token($token);
    // 参数
    $data = self::Post('data');
    if(empty($data)) return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    $data = json_decode($data);
    // 数据
    $model = new UserInfoM();
    $info = [
      'nickname'=> trim($data->nickname),
      'name'=> trim($data->name),
      'gender'=> trim($data->gender),
      'birthday'=> trim($data->birthday),
      'position'=> trim($data->position),
    ];
    $model->Set($info);
    $model->Where('uid=?', $tData->uid);
    // 返回
    $info['uname'] = $tData->uname;
    $info['img'] = $data->img;
    return self::GetJSON(['code'=>0,'msg'=>'成功','uinfo'=>$info]);
  }

}