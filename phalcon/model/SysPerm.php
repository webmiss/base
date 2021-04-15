<?php
namespace Model;

/* 权限表 */
class UserPerm extends Model {

  /* 构造函数 */
  function __construct(){
    $this->Table('sys_perm');
  }

}