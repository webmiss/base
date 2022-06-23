<?php
namespace Model;

/* 后台权限表 */
class SysPerm extends Model {

  /* 构造函数 */
  function __construct(){
    $this->Table('sys_perm');
  }

}