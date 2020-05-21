<?php

use Phalcon\Cli\Task;
use app\library\Safety;

class Base extends Task{

  /* Token-验证 */
  protected function verToken($token){
    // 解密
    $data = Safety::decode($token,$this->config->key);
    if(!isset($data->login) || $data->ltime<time()) return false;
    // 结果
    return $data;
  }

}