<?php

namespace app\model;

/* 角色 */
class UserRole extends BaseModel{

  public $id;
  private $role;
  private $utime;

  public function initialize(){
    // 数据表
    $this->setSource('user_role');
  }

  /* 名称 */
  public function setRole($role){
    $num = mb_strlen($role,"utf-8");
    if($num<2 || $num>6){
      return self::error('名称为2~6位字符！');
    }
    $this->role = $role;
  }
  public function getRole(){
    return $this->role;
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
