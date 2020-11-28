<?php
namespace app\model;

/* 用户信息表 */
class UserInfo extends Model {

  public $uid;
  protected $birthday;
  protected $utime;
  
  /* 构造函数 */
  public function initialize(){
    $this->setSource('user_info');  //数据表
  }

  /* 生日 */
  function setBirthday($val){
    if(empty($val)){
      $val = null;
    }
    $this->birthday = $val;
  }
  function getBirthday(){
    return $this->birthday;
  }

  /* 更新 */
  public function beforeUpdate(){
    $this->utime = date('YmdHis');
  }

}
