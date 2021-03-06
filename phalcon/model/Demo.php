<?php
namespace model;

use Model\Model;

/* 测试表 */
class Demo extends Model {

  /* 构造函数 */
  function __construct(){
    self::Table('test');
  }

}