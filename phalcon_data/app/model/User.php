<?php

namespace app\model;

use app\library\Safety;

/* 用户 */
class User extends BaseModel{

  public $id;
  public $uname;
  public $tel;
  public $email;

  public function initialize(){
    // 数据表
    $this->setSource('user');
  }

  /* 保存 */
  public function beforeSave(){
    // 用户名
    if(!empty($this->uname)){
      $msg = Safety::isRight('uname',$this->uname);
      if($msg!==true) return self::error($msg);
    }
    // 手机
    if(!empty($this->tel)){
      $msg = Safety::isRight('tel',$this->tel);
      if($msg!==true) return self::error($msg);
    }
    // 邮箱
    if(!empty($this->email)){
      $msg = Safety::isRight('email',$this->email);
      if($msg!==true) return self::error($msg);
    }
  }

  /* 创建 */
  public function beforeCreate(){
    // 注册时间
    $this->rtime = date('YmdHis');
  }

  /* 更新 */
  public function beforeUpdate(){
    $this->utime = date('YmdHis');
  }

  /* 删除 */
  public function beforeDelete(){
    if($this->id==1) return self::error('禁止删除超级管理员!');
  }

}
