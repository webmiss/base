<?php

use Phalcon\Loader;

$loader = new Loader();

/* 注册：命名空间 */
$loader->registerNamespaces([
  'app'  => APP_PATH,
  'app\library'  => APP_PATH.'/library/',
  'app\common'  => APP_PATH.'/common/',
  'app\model'  => APP_PATH.'/model/',
]);

/* 注册：目录 */
$loader->registerDirs([
  APP_PATH.'/tasks/',
]);

$loader->register();
