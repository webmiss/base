<?php

namespace app\modules\admin\controller;

use app\library\Safety;
use app\library\Centre;

class UserpasswdController extends UserBase {

  /* 编辑 */
  function editAction(){
    self::getJSON();
    $passwd = $this->request->get('passwd','string');
    $passwd1 = $this->request->get('passwd1','string');
    // 验证
    if($passwd==$passwd1) return self::getJSON(['code'=>4000,'msg'=>'不能与原密码相同！']);
    if(Safety::isRight('passwd',$passwd)!==true || Safety::isRight('passwd',$passwd1)!==true){
      return self::getJSON(['code'=>4000,'msg'=>'密码格式错误！']);
    }
    $res = Centre::passwd(self::$token->uid,$passwd,$passwd1);
    return $res===true?self::getJSON(['code'=>0]):self::getJSON(['code'=>4011,'msg'=>$res]);
  }

}