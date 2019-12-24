<?php

namespace app\modules\admin\controller;

use app\library\Safety;
use app\model\User;

class UserpasswdController extends UserBase {

  /* 编辑 */
  function editAction(){
    $passwd = $this->request->get('passwd','string');
    $passwd1 = $this->request->get('passwd1','string');
    // 验证
    if($passwd==$passwd1) return self::getJSON(['code'=>4000,'msg'=>'不能与原密码相同！']);
    if(Safety::isRight('passwd',$passwd)!==true || Safety::isRight('passwd',$passwd1)!==true){
      return self::getJSON(['code'=>4000,'msg'=>'密码格式错误！']);
    }
    // 模型
    $model = User::findFirst(['id=:id: AND password=:passwd:','bind'=>['id'=>self::$token->uid,'passwd'=>md5($passwd)]]);
    if(!$model) return self::getJSON(['code'=>4000,'msg'=>'当前密码错误！']);
    $model->password = md5($passwd1);
    return $model->save()==true?self::getJSON(['code'=>0]):self::error(4022);
  }

}