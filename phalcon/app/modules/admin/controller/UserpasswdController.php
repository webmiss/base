<?php

namespace app\modules\admin\controller;

use app\common\Base;
use app\common\AdminToken;
use app\library\Safety;
use app\model\User;

/* 控制台 */
class UserPasswdController extends Base{

  private static $tokenData;

  /* 构造函数 */
  function initialize(){
    parent::initialize();
    // 控制器权限
    self::$tokenData = AdminToken::urlVerify('UserPasswd');
  }

  /* 修改密码 */
  function editAction(){
    $passwd = $this->request->get('passwd');
    $passwd1 = $this->request->get('passwd1');
    // 验证
    if($passwd==$passwd1){
      return self::getJSON(['code'=>4000,'msg'=>'不能与原密码相同!']);
    }
    if(!Safety::isRight('passwd',$passwd) || !Safety::isRight('passwd',$passwd1)){
      return self::getJSON(['code'=>4000,'msg'=>'密码格式错误!']);
    }
    // 用户信息
    $model = User::findFirst([
      'id=:id: AND password=:passwd:',
      'bind'=>['id'=>self::$tokenData->uid,'passwd'=>md5($passwd)],
    ]);
    // 是否存在
    if(!$model){
      return self::getJSON(['code'=>4000,'msg'=>'当前密码错误!']);
    }
    $model->password = md5($passwd1);
    // 保存
    if($model->save()){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'修改失败!']);
    }
  }

}