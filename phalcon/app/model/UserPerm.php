<?php

namespace app\model;

/* 权限 */
class UserPerm extends BaseModel{

  public $uid;
  private $utime;

  public function initialize(){
    // 数据表
    $this->setSource('user_perm');
  }

  /* 创建 */
  public function beforeCreate(){
    $this->ctime = date('YmdHis');
  }

  /* 更新 */
  public function beforeUpdate(){
    $this->utime = date('YmdHis');
  }

  /* 删除 */
  public function beforeDelete(){
    if($this->uid==1) return self::error('禁止删除超级管理员!');
  }

}
