<?php
namespace Model;

/* 用户表 */
class User extends Model {

  /* 构造函数 */
  function __construct(){
    parent::__construct();
    $this->Db('');
    $this->Table('user');
  }

}