<?php
/* 路由 */
$router = $di->getRouter();
foreach ($app->getModules() as $key => $module) {
	$namespace = preg_replace('/module$/', 'controller', $module["className"]);
	$router->add('/'.$key.'/:params', [
		'namespace' => $namespace,
		'module' => $key,
		'controller' => 'index',
		'action' => 'index',
		'params' => 1
	])->setName($key);
	$router->add('/'.$key.'/:controller/:params', [
		'namespace' => $namespace,
		'module' => $key,
		'controller' => 1,
		'action' => 'index',
		'params' => 2
	]);
	$router->add('/'.$key.'/:controller/:action/:params', [
		'namespace' => $namespace,
		'module' => $key,
		'controller' => 1,
		'action' => 2,
		'params' => 3
	]);
}
