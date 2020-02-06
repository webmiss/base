<?php

use Phalcon\Mvc\Url;
use Phalcon\Http\Request;
use Phalcon\Http\Response;

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

/**
* 注册：URL
*/
$di->setShared('url', function () {
	// 配置文件
	$config = $this->getConfig();
	// 公共类
	$inc = new \app\library\Inc();
	// 设置网址
	$url = new Url();
	$url->setBaseUri($inc->BaseUrl().$this->getDispatcher()->getModuleName().'/'.$config->application->baseUri);
	return $url;
});
