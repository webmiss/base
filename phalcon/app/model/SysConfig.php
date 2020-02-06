<?php

namespace app\model;

/* 系统配置 */
class SysConfig extends BaseModel{

  public $id;

  public function initialize(){
    // 数据表
    $this->setSource('sys_config');
  }

}
