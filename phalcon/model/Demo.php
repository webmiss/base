<?php
namespace Model;

/* 测试表 */
class Demo extends Model {

  /* 构造函数 */
  function __construct(){
    parent::__construct();
    $this->Db('');
    $this->Table('test');
  }

}