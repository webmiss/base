<?php

namespace app\model;

use app\library\Safety;

/* 用户 */
class User extends BaseModel{

  public $id;
  protected $uname;
  protected $tel;
  protected $email;
  protected $password;

  public function initialize(){
    // 数据表
    $this->setSource('user');
  }

  /* 用户名 */
  public function setUname($uname){
    $msg = Safety::isRight('uname',$uname);
    if(!empty($uname) && $msg!==true){
      return self::error($msg);
    }
    $this->uname = $uname;
  }
  public function getUname(){
    return $this->uname;
  }

  /* 手机 */
  public function setTel($tel){
    $msg = Safety::isRight('tel',$tel);
    if(!empty($tel) && $msg!==true){
      return self::error($msg);
    }
    $this->tel = $tel;
  }
  public function getTel(){
    return $this->tel;
  }

  /* 邮箱 */
  public function setEmail($email){
    $msg = Safety::isRight('email',$email);
    if(!empty($email) && $msg!==true){
      return self::error($msg);
    }
    $this->email = $email;
  }
  public function getEmail(){
    return $this->email;
  }

  /* 默认密码 */
  public function setPassword($password){
    if(empty($password)) $password = md5('123456');
    $this->password = $password;
  }
  public function getPassword(){
    return $this->password;
  }

}
