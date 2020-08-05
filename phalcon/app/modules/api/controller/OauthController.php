<?php

namespace app\modules\api\controller;

use app\controller\Base;

use app\model\UserOauth;

class OauthController extends Base{

  /* 获取Token */
  function tokenAction(){
    $client_id = $this->request->get('client_id','string');
    $client_secret  = $this->request->get('client_secret','string');
    if(empty($client_id) && empty($client_secret)) return self::getJSON(['code'=>4000]);
    // 是否存在
    $uData = UserOauth::findFirst([
      'client_id=:id: AND client_secret=:secret:',
      'bind'=>['id'=>$client_id,'secret'=>$client_secret],
      'columns'=>'id,client_id,state'
    ]);
    if(empty($uData)) return self::getJSON(['code'=>4010]);
    // 是否禁用
    if($uData->state!=1) return self::getJSON(['code'=>4020,'msg'=>'用户已禁用']);
    // 结果
    return self::getJSON([
      'code'=>0,
      'token'=>self::setToken('P'.$uData->id,['client_id'=>$uData->client_id])
    ]);
  }

}