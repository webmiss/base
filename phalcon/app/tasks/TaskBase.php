<?php

use app\controller\Base;

class TaskBase extends Base{

  /* 数据库 */
  protected function db(){
    // 参数
    $params = [
      'host'=>$this->config->database->host,
      'username'=>$this->config->database->username,
      'password'=>$this->config->database->password,
      'dbname'=>$this->config->database->dbname,
      'charset'=>$this->config->database->charset
    ];
    // 删除编码
    if ($this->config->database->adapter == 'Postgresql') unset($params['charset']);
    // 命名空间
    $class = 'Phalcon\Db\Adapter\Pdo\\' . $this->config->database->adapter;
    return new $class($params);
  }

  /* Redis */
  protected function redis(){
    $redis = new \Redis();
    $redis->connect($this->config->redis->host,$this->config->redis->port);
    if($this->config->redis->pwd) $redis->auth($this->config->redis->pwd);
    $redis->select($this->config->redis->db);
    return $redis;
  }

  /* 生成SQL */
  protected function getSql($param=[]){
    $sql = '';
    if($param['type']=='add'){
      // 添加
      $k = '`'.implode('`,`', array_keys($param['data'])).'`';
      $v = '';
      foreach($param['data'] as $val){
        $v .= '\''.$val.'\',';
      }
      $v = rtrim($v,',');
      $sql = 'INSERT INTO `'.$param['table'].'`('.$k.') VALUES ('.$v.')';
    }elseif($param['type']=='edit'){
      // 编辑
      foreach($param['data'] as $key=>$val){
        $sql .= '`'.$key.'`=\''.$val.'\',';
      }
      $sql = rtrim($sql,',');
      // SQL
      $sql = 'UPDATE `'.$param['table'].'` SET '.$sql.' WHERE '.$param['where'];
    }
    return $sql;
  }

}