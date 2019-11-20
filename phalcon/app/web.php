<?php

use Phalcon\Di;
use Phalcon\Mvc\Router;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Mvc\Application;
use Phalcon\Config\Adapter\Php as phpConfig;

// 开发模式(1.Development，2.Production)
$mode = 'Development';

define('BASE_PATH', dirname(__DIR__));
define('APP_PATH', BASE_PATH . '/app');

// Composer
require BASE_PATH.'/vendor/autoload.php';

try {
  // 注册堆栈框架
  $di = new Di();
  /* 注册：配置 */
	$di->setShared('config', function () {
    return new phpConfig(APP_PATH.'/config/env.php');
  });
  // 自动加载
  require APP_PATH.'/config/loader.php';
  // 公共服务
  require APP_PATH.'/config/services.php';
  /*  注册：路由 */
	$di->setShared('router', function () {
    $router = new Router();
    // 默认
		$router->setDefaultModule('home');
		return $router;
  });
  /* 注册：适配器 */
	$di->setShared('dispatcher', function() {
    $dispatcher = new Dispatcher();
    // 默认命名空间
		$dispatcher->setDefaultNamespace('app\modules\home\controller');
		return $dispatcher;
	});

  // 创建应用
	$app = new Application($di);
  // 注册：模块
	$app->registerModules([
		'home'=>[
			'className'=>'app\modules\home\module',
			'path'=>APP_PATH.'/modules/home/Module.php',
		],
		'admin'=>[
			'className'=>'app\modules\admin\module',
			'path'=>APP_PATH.'/modules/admin/Module.php',
		],
		'api'=>[
			'className'=>'app\modules\api\module',
			'path'=>APP_PATH.'/modules/api/Module.php',
		],
  ]);
  // 路由适配
  require APP_PATH . '/config/routes.php';
  // 执行
  $uri = explode('?', $di->get('request')->getURI());
	$app->handle($uri[0]??'/')->send();
}catch (\Exception $e){
  if($mode=='Development'){
    echo $e->getMessage().'<br>';
    echo '<pre>'.$e->getTraceAsString().'</pre>';
  }else{
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:*');
    header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
    echo json_encode(['code'=>5000,'msg'=>$e->getMessage()]);
  }
}