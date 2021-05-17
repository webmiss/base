<?php
namespace App\Admin;

use Library\Safety;
use Service\Base;
use Service\AdminToken;
use Model\User;

class UserPasswd extends Base {

  /* 编辑 */
  static function Edit(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    $tData = AdminToken::Token($token);
    // 参数
    $passwd = self::Post('passwd');
    $passwdNew = self::Post('passwdNew');
    if($passwd == $passwdNew) return self::GetJSON(['code'=>4000, 'msg'=>'不能与原密码相同!']);
    if(!Safety::IsRight('passwd', $passwd) || !Safety::IsRight('passwd', $passwdNew)){
      return self::GetJSON(['code'=>4000, 'msg'=>'密码为6～16位!']);
    }
    // 数据
    $model = new User();
    $model->Columns('id');
    $model->where('id=? AND password=?', $tData->uid, md5($passwd));
    $uData = $model->FindFirst();
    if(empty($uData)) return self::GetJSON(['code'=>4000, 'msg'=>'当前密码错误!']);
    $model->Set(['password'=>md5($passwdNew)]);
    $model->Where('id=?', $tData->uid);
    if(!$model->Update()) return self::GetJSON(['code'=>5000, 'msg'=>'修改失败!']);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功']);
  }

}