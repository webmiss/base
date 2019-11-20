<?php

use Phalcon\Loader;

$loader = new Loader();

/* 注册：命名空间 */
$loader->registerNamespaces([
  'app\library'  => APP_PATH.'/library/',
  'app\controller'  => APP_PATH.'/controller/',
  'app\model'  => APP_PATH.'/model/',
]);

/* 注册：目录 */
$loader->registerDirs([
  APP_PATH.'/tasks/',
]);

$loader->register();
