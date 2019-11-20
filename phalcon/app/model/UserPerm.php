<?php

namespace app\model;

/* 权限 */
class UserPerm extends BaseModel{

  public $id;
  protected $utime;

  /* 数据表 */
  public function getSource(){
    return "user_perm";
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
