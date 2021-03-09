<?php
namespace Model;

/* 系统配置表 */
class SysConfig extends Model {

  /* 构造函数 */
  function __construct(){
    self::Db('');
    self::Table('sys_config');
  }

}