<?php
declare(strict_types=1);

use Phalcon\Loader;
use Phalcon\Di\FactoryDefault\Cli as CliDI;
use Phalcon\Cli\Dispatcher;
use Phalcon\Cli\Console;
use Phalcon\Exception as PhalconException;

define('BASE_PATH', __DIR__);

/* Composer */
$load = BASE_PATH.'/vendor/autoload.php';
if(!is_file($load)) die('安装依赖包: composer install');
require $load;

/* 命名空间 */
$loader = new Loader();
$loader->registerNamespaces([
  'Task'=> 'task/',
  'Config'=> BASE_PATH.'/config/',
  'Library'=> BASE_PATH.'/library/',
  'Model'=> BASE_PATH.'/model/',
  'Service'=> BASE_PATH.'/service/',
  'Util'=> BASE_PATH.'/util/',
]);
$loader->register();

/* Cli */
$container  = new CliDI();

/* 适配器 */
$dispatcher = new Dispatcher();
$dispatcher->setDefaultNamespace('Task');
$container->setShared('dispatcher', $dispatcher);

/* 参数 */
$arguments = [];
foreach ($argv as $k => $arg) {
  if ($k === 1) {
    $arguments['task'] = $arg;
  } elseif ($k === 2) {
    $arguments['action'] = $arg;
  } elseif ($k >= 3) {
    $arguments['params'][] = $arg;
  }
}

try {
  $console = new Console($container);
  $console->handle($arguments);
} catch (PhalconException $e) {
  fwrite(STDERR, $e->getMessage() . PHP_EOL);
  exit(1);
} catch (Throwable $throwable) {
  fwrite(STDERR, $throwable->getMessage() . PHP_EOL);
  exit(1);
} catch (Exception $exception) {
  fwrite(STDERR, $exception->getMessage() . PHP_EOL);
  exit(1);
}