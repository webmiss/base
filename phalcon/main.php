<?php
use Phalcon\Loader;
use Phalcon\Mvc\Micro;

use Base\Base;
use Router\Home;
use Router\Api;
use Router\Admin;

define('BASE_PATH', __DIR__);
define('STDERR',fopen('php://stderr', 'a'));

/* Composer */
$load = BASE_PATH.'/vendor/autoload.php';
if(!is_file($load)) die('安装依赖包: composer install');
require $load;

/* 命名空间 */
$loader = new Loader();
$loader->registerNamespaces([
  'Base'=> BASE_PATH.'/base/',
  'Config'=> BASE_PATH.'/config/',
  'Library'=> BASE_PATH.'/library/',
  'Middleware'=> BASE_PATH.'/middleware/',
  'Model'=> BASE_PATH.'/model/',
  'Router'=> BASE_PATH.'/router/',
  'Service'=> BASE_PATH.'/service/',
  'Util'=> BASE_PATH.'/util/',
  'App\Home'=> BASE_PATH.'/modules/home/',
  'App\Api'=> BASE_PATH.'/modules/api/',
  'App\Admin'=> BASE_PATH.'/modules/admin/',
]);
$loader->register();

/* 注册 */
$app = new Micro();

// 路由 
Home::Init($app);
Api::Init($app);
Admin::Init($app);

// 运行
try {
  $app->notFound('Middleware\NotFound::Init');
  $app->handle($_SERVER["REQUEST_URI"]);
}catch (\Exception $e){
  echo Base::GetJSON(['code'=>500,'msg'=>$e->getMessage()]);
}
