<?php
namespace app\model;

class UserOauth extends Model{

  private $id;

  /* 构造函数 */
  public function initialize(){
    $this->setSource('user_oauth'); //数据表
  }

}
