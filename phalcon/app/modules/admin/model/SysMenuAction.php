<?php

namespace app\modules\admin\model;

use app\model\BaseModel;

class SysMenuAction extends BaseModel{

  public $id;
  private $name;
  private $action;
  private $perm;

  /* 数据表 */
  public function getSource(){
    return "sys_menus_action";
  }
  
  /* 名称 */
  public function setName($name){
    $num = mb_strlen($name,"utf-8");
    if($num<2 || $num>6){
      return self::error('名称为2~6位字符！');
    }
    $this->name = $name;
  }
  public function getName(){
    return $this->name;
  }

  /* 命名 */
  public function setAction($action){
    if(!preg_match('/^[a-zA-Z]{3,16}$/',$action)){
      return self::error('命名为3~16位英文！');
    }
    $this->action = $action;
  }
  public function getAction(){
    return $this->action;
  }

  /* 权限 */
  public function setPerm($perm){
    if((int)$perm<1 || (int)$perm%2!=0){
      return self::error('权限为2的n次方！');
    }
    $this->perm = $perm;
  }
  public function getPerm(){
    return $this->perm;
  }

}
