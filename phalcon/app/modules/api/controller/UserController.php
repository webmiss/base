<?php
namespace app\modules\api\controller;

use app\controller\Base;
use app\library\Centre;
use app\library\Safety;

class UserController extends Base{

  /* 登录 */
  function loginAction(){
    // 数据
    $tel = trim($this->request->get('tel', 'string'));
    $passwd = $this->request->get('passwd', 'string');
    // 验证
    if(Safety::isRight('tel',$tel)!==true && Safety::isRight('passwd',$passwd)!==true){
      return self::getJSON(['code'=>4000]);
    }
    // 用户数据
    $uInfo = Centre::login($tel,$passwd);
    if($uInfo->code!=0) return self::getJSON(['code'=>4000,'msg'=>$uInfo->msg]);
    // 返回
    return self::getJSON([
      'code'=>0,
      'uinfo'=>$uInfo->info,
      'token'=> self::setToken($uInfo->info->uid,[
        'tel'=>$tel,
      ]),
    ]);
  }

}

