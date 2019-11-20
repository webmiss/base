<?php

namespace app\model;

/* 用户信息 */
class UserInfo extends BaseModel{

  public $id;
  protected $birthday;
  
  /* 数据表 */
  public function getSource(){
    return "user_info";
  }

  /* 生日 */
  public function setBirthday($birthday){
    if(empty($birthday)) $birthday = null;
    $this->birthday = $birthday;
  }
  public function getBirthday(){
    return $this->birthday;
  }

}
