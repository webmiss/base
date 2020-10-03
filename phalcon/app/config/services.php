<?php

use app\Env;
use Phalcon\Http\Request;
use Phalcon\Http\Response;

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
    'charset'=>$conf['charset']
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

/**
* 注册：过滤
*/
$di->set('filter', function() {
  return new Phalcon\Filter();
});

/**
* 注册：请求
*/
$di->setShared('request', function () {
	return new Request();
});

/**
* 注册：响应
*/
$di->setShared('response', function () {
	return new Response();
});
