<?php

namespace app\controller;

use Phalcon\Mvc\Controller;
use app\library\Safety;
use app\library\Code;

use app\model\SysConfig;

class Base extends Controller{
    
  /* 返回JSON */
  protected function getJSON($data=''){
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:*');
    header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
    // 获取消息
    if(isset($data['code']) && !isset($data['msg'])){
      $data['msg'] = Code::get($data['code'].'');
    }
    return $this->response->setJsonContent($data);
  }

  /* 异常错误 */
  static protected function error($code){
    $msg = Code::get($code.'');
    throw new \InvalidArgumentException($msg);
  }

  /* 调试信息 */
  protected function bug($data=''){
    self::getJSON();print_r($data);die;
  }

  /* 回滚 */
  protected function rollback($model){
    if($model->save()==false){
      $this->db->rollback();
      return self::error(4022);
    }
  }

  /* 获取系统配置 */
  protected function getConfig($name){
    return SysConfig::findFirst('name="'.$name.'"');
  }

  /* Token-验证 */
  protected function verToken($token){
    // 解密
    $data = Safety::decode($token,$this->config->key);
    if(!isset($data->login) || $data->ltime<time()) return self::error(1002);
    // 结果
    return $data;
  }
  
  /* Token-加密 */
  protected function setToken($uid,$data){
    return Safety::encode([
      'uid'=>$uid,
      'data'=>$data,
      'login'=>true,
      'ltime'=>time()+$this->config->token_time,
    ],$this->config->key);
  }
  
}