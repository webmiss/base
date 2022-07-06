<?php
use Phalcon\Loader;
use Phalcon\Mvc\Micro;

use Middleware\Cors;
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
  'Config'=> BASE_PATH.'/config/',
  'Library'=> BASE_PATH.'/library/',
  'Library\Aliyun'=> BASE_PATH.'/library/aliyun',
  'Library\Baidu'=> BASE_PATH.'/library/baidu',
  'Library\Tencent'=> BASE_PATH.'/library/tencent',
  'Middleware'=> BASE_PATH.'/middleware/',
  'Model'=> BASE_PATH.'/model/',
  'Router'=> BASE_PATH.'/router/',
  'Service'=> BASE_PATH.'/service/',
  'Util'=> BASE_PATH.'/util/',
  'App\Api'=> BASE_PATH.'/modules/api/',
  'App\Admin'=> BASE_PATH.'/modules/admin/',
  'App\Home'=> BASE_PATH.'/modules/home/',
  'App\Demo'=> BASE_PATH.'/modules/demo/',
]);
$loader->register();

/* 微应用 */
$app = new Micro();

/* 中间件 */
$app->before(function() use ($app) {
  Cors::Init(); //允许跨域请求
});

// 路由 
Api::Init($app);
Admin::Init($app);
Home::Init($app);

// 运行
try {
  $app->notFound('Middleware\NotFound::Init');
  $app->handle($_SERVER["REQUEST_URI"]);
}catch (\Exception $e){
  Cors::Init();
  echo json_encode(['code'=>500,'msg'=>$e->getMessage()]);
}
