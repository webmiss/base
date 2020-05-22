<?php

namespace app\model;

/* 用户信息 */
class UserInfo extends BaseModel{

  public $uid;
  public $birthday;
  
  public function initialize(){
    // 数据表
    $this->setSource('user_info');
  }

  /* 保存 */
  public function beforeSave(){
    // 生日
    if(empty($this->birthday)) $this->birthday = null;
  }

  /* 删除 */
  public function beforeDelete(){
    if($this->uid==1) return self::error('禁止删除超级管理员!');
  }

}
