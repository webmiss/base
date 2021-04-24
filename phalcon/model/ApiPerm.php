<?php
namespace Model;

/* API权限 */
class ApiPerm extends Model {

  /* 构造函数 */
  function __construct(){
    $this->Table('api_perm');
  }

}