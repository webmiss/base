<?php

namespace app\model;

class Msg extends BaseModel{

  public $id;

  public function initialize(){
    // 数据表
    $this->setSource('web_msg');
  }

}
