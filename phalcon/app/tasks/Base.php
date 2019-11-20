<?php

use Phalcon\Cli\Task;
use app\library\Safety;

class Base extends Task{

  /* 调试信息 */
  protected function bug($data=''){
    self::getJSON();print_r($data);die;
  }

  /* 异常错误 */
  static protected function error($msg){
    throw new \InvalidArgumentException($msg);
  }

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

  /* Token-验证 */
  protected function verToken($token){
    // 解密
    $data = Safety::decode($token,$this->config->key);
    if(!isset($data->login) || $data->ltime<time()) return false;
    // 结果
    return $data;
  }

}