<?php
namespace app\model;

/* 角色表 */
class UserRole extends Model {

  protected $id;
  protected $role;
  protected $ctime;
  protected $utime;

  /* 构造函数 */
  public function initialize(){
    $this->setSource('user_role');  //数据表
  }

  /* 名称 */
  function setRole($val){
    $num = mb_strlen($val,'utf-8');
    if($num<2 || $num>16){
      self::error('名称为2~16位字符!');
    }
    $this->role = $val;
  }
  function getRole(){
    return $this->role;
  }

  /* 创建 */
  public function beforeCreate(){
    $this->ctime = date('YmdHis');
  }

  /* 更新 */
  public function beforeUpdate(){
    $this->utime = date('YmdHis');
  }

}
