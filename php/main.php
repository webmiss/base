<?php
use Illuminate\Container\Container;
use Illuminate\Events\EventServiceProvider;
use Illuminate\Routing\RoutingServiceProvider;
use Illuminate\Http\Request;

use Middleware\Cors;
use Router\Home;
use Router\Admin;
use Router\Api;

/* 常量 */
define('BASE_PATH', __DIR__);
define('STDERR',fopen('php://stderr', 'a'));

/* Composer */
$load = BASE_PATH.'/vendor/autoload.php';
if(!is_file($load)) die('安装依赖包: composer install');
require $load;

/* 应用 */
$app = new Container();
$app::setInstance($app);

try{
  /* 注册 */
  (new EventServiceProvider($app))->register();
  (new RoutingServiceProvider($app))->register();
  /* 路由 */
  Home::Init();
  Admin::Init();
  Api::Init();
  /* 请求 */
  $request = Request::createFromGlobals();
  $response = $app['router']->dispatch($request);
  $response->send();
}catch (\Exception $e){
  Cors::Init();
  echo json_encode(['code'=>500,'msg'=>'服务错误！']);
}
