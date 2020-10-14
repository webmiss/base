<?php
namespace app\model;

/* 用户信息表 */
class UserInfo extends Model {

  public $uid;
  public $birthday;
  public $ctime;
  public $utime;
  
  public function initialize(){
    // 数据表
    $this->setSource('user_info');
  }

  /* 保存 */
  public function beforeSave(){
    // 生日
    if(empty($this->birthday)) $this->birthday = null;
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
