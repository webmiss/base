<?php
namespace app\model;

/* 角色表 */
class UserRole extends Model {

  private $id;
  public $role;
  public $ctime;
  public $utime;

  /* 构造函数 */
  public function initialize(){
    $this->setSource('user_role');  //数据表
  }

  /* 保存 */
  public function beforeSave(){
    // 名称
    $num = mb_strlen($this->role,'utf-8');
    if($num<2 || $num>6){
      return self::error('名称为2~6位字符！');
    }
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
