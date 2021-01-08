<?php
namespace app\model;

/* 权限表 */
class UserPerm extends Model {

  public $uid;
  protected $utime;

  /* 构造函数 */
  public function initialize(){
    $this->setSource('user_perm');  //数据表
  }

  /* 更新 */
  public function beforeUpdate(){
    $this->utime = date('YmdHis');
  }

}
