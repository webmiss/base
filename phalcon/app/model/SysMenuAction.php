<?php
namespace app\model;

class SysMenuAction extends Model{

  private $id;
  public $name;
  public $action;
  public $perm;
  public $ctime;
  public $utime;

  /* 构造函数 */
  public function initialize(){
    $this->setSource('sys_menus_action'); //数据表
  }

  /* 保存 */
  public function beforeSave(){
    // 名称
    $num = mb_strlen($this->name,'utf-8');
    if($num<2 || $num>6){
      return self::error('名称为2~6位字符！');
    }
    // 命名
    if(!preg_match('/^[a-zA-Z]{3,16}$/',$this->action)){
      return self::error('命名为3~16位英文！');
    }
    // 权限
    if((int)$this->perm<1 || (int)$this->perm%2!=0){
      return self::error('权限为2的n次方！');
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