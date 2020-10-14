<?php
namespace app\model;

class UserOauth extends Model{

  private $id;

  public function initialize(){
    // 数据表
    $this->setSource('user_oauth');
  }

}
