<?php
namespace App\Admin;

use Library\Safety;
use Service\Base;
use Service\AdminToken;
use Model\User;

class UserPasswd extends Base {

  /* 编辑 */
  static function Edit(){
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $passwd = self::JsonName($json, 'passwd');
    $passwdNew = self::JsonName($json, 'passwdNew');
    // 验证
    $msg = AdminToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if($passwd == $passwdNew) return self::GetJSON(['code'=>4000, 'msg'=>'不能与原密码相同!']);
    if(!Safety::IsRight('passwd', $passwd) || !Safety::IsRight('passwd', $passwdNew)){
      return self::GetJSON(['code'=>4000, 'msg'=>'密码为6～16位!']);
    }
    // 数据
    $tData = AdminToken::Token($token);
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