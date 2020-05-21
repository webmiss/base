<?php

namespace app\model;

class Msg extends BaseModel{

  public $id;
  protected $utime;

  public function initialize(){
    // 数据表
    $this->setSource('web_msg');
  }

  /* 更新时间 */
  public function setUtime($utime){
    if(empty($utime)) $utime = null;
    $this->utime = $utime;
  }
  public function getUtime(){
    return $this->utime;
  }

}
