<?php
namespace Model;

/* 系统菜单表 */
class SysMenu extends Model {

  /* 构造函数 */
  function __construct(){
    $this->Table('sys_menus');
  }

}