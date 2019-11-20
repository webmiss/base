<?php

namespace app\model;

/* 系统配置 */
class SysConfig extends BaseModel{

  public $id;

  /* 数据表 */
  public function getSource(){
    return 'sys_config';
  }

}
