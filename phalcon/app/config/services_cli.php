<?php

/**
* 注册：数据库
*/
$di->setShared('db', function () {
  // 配置文件
  $config = $this->getConfig();
  // 参数
  $params = [
    'host'=>$config->database->host,
    'username'=>$config->database->username,
    'password'=>$config->database->password,
    'dbname'=>$config->database->dbname,
    'charset'=>$config->database->charset
  ];
  // 删除编码
  if ($config->database->adapter == 'Postgresql') unset($params['charset']);
  // 命名空间
  $class = 'Phalcon\Db\Adapter\Pdo\\' . $config->database->adapter;
  return new $class($params);
});

/**
* 注册：Redis
*/
$di->setShared('redis', function () {
  $config = $this->getConfig();
  $redis = new \Redis();
  $redis->connect($config->redis->host,$config->redis->port);
  if($config->redis->pwd) $redis->auth($config->redis->pwd);
  $redis->select($config->redis->db);
  return $redis;
});

/**
* 注册：模型
*/
$di->set('modelsManager', function() {
  return new Phalcon\Mvc\Model\Manager();
});
$di->set('modelsMetadata', function() {
  return new Phalcon\Mvc\Model\MetaData\Memory();
});
