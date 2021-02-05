<?php
namespace app\model;

use app\library\Safety;

/* 用户表 */
class User extends Model{

  public $id;
  public $uname;
  public $tel;
  public $email;
  public $password;
  public $rtime;
  public $utime;

  /* 构造函数 */
  function initialize(){
    $this->setSource('user'); //数据表
  }

  /* 用户名 */
  function setUname($val){
    if(!empty($val)){
      if(!Safety::isRight('uname',$val)) self::error('用户名英文开头4～16位!');
    }
    $this->uname = $val;
  }
  function getUname(){
    return $this->uname;
  }

  /* 手机 */
  function setTel($val){
    if(!empty($val)){
      if(!Safety::isRight('tel',$val)) self::error('手机号码有误!');
    }
    $this->tel = $val;
  }
  function getTel(){
    return $this->tel;
  }

  /* 邮箱 */
  function setEmail($val){
    if(!empty($val)){
      if(!Safety::isRight('email',$val)) self::error('邮箱有误!');
    }
    $this->email = $val;
  }
  function getEmail(){
    return $this->email;
  }

  /* 密码 */
  function setPassword($val){
    if(empty($val)){
      $val = md5('123456');
    }
    $this->password = $val;
  }
  function getPassword(){
    return $this->password;
  }

  /* 创建 */
  public function beforeCreate(){
    $this->rtime = date('YmdHis');
  }

  /* 更新 */
  public function beforeUpdate(){
    $this->utime = date('YmdHis');
  }

}
