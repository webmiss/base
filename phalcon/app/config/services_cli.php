<?php

use app\Env;

/**
* 注册：数据库
*/
$di->setShared('db', function () {
  // 配置文件
  $conf = Env::db();
  // 参数
  $params = [
    'host'=>$conf['host'],
    'username'=>$conf['username'],
    'password'=>$conf['password'],
    'dbname'=>$conf['dbname'],
    'port'=>$conf['port'],
    'charset'=>$conf['charset'],
    'persistent'=>$conf['persistent'],
  ];
  // 删除编码
  if ($conf['adapter'] == 'Postgresql') unset($params['charset']);
  // 命名空间
  $class = 'Phalcon\Db\Adapter\Pdo\\'.$conf['adapter'];
  return new $class($params);
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

