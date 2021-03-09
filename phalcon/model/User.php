<?php
namespace model;

use Model\Model;

/* 用户表 */
class User extends Model {

  /* 构造函数 */
  function __construct(){
    self::Db('');
    self::Table('user');
  }

}