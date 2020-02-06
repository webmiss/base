<?php

namespace app\model;

use Phalcon\Mvc\Model;

class BaseModel extends Model{

  /* 异常错误 */
  static protected function error($msg){
    throw new \InvalidArgumentException($msg);
  }

}