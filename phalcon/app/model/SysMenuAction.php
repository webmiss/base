<?php
namespace app\model;

use app\library\Safety;

class SysMenuAction extends Model{

  protected $id;
  protected $name;
  protected $action;
  protected $perm;

  /* 构造函数 */
  public function initialize(){
    $this->setSource('sys_menus_action'); //数据表
  }

  /* 名称 */
  function setName($val){
    $num = mb_strlen($val,'utf-8');
    if($num<2 || $num>6){
      self::error('名称为2~6位字符!');
    }
    $this->name = $val;
  }
  function getName(){
    return $this->name;
  }

  /* 命名 */
  function setAction($val){
    if(!Safety::test('^[a-zA-Z]{2,16}$',$val)){
      self::error('命名为2~16位英文!');
    }
    $this->action = $val;
  }
  function getAction(){
    return $this->action;
  }

  /* 权限 */
  public function setPerm($val){
    if((int)$val<2 || (int)$val%2!=0){
      self::error('权限为2的n次方!');
    }
    $this->perm = $val;
  }
  public function getPerm(){
    self::error('测试');
    return $this->perm;
  }

}