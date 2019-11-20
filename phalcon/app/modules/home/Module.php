<?php
namespace app\modules\home;

use Phalcon\DiInterface;
use Phalcon\Loader;
use Phalcon\Mvc\View;
use Phalcon\Mvc\ModuleDefinitionInterface;

class Module implements ModuleDefinitionInterface{

	/* 注册：自动加载模块 */
	public function registerAutoloaders(DiInterface $di=null){
		$loader = new Loader();
		$loader->registerNamespaces([
			'app\modules\home\controller'=>__DIR__.'/controller/',
			'app\modules\home\model'=>__DIR__.'/model/',
		]);
		$loader->register();
	}

	/* 注册：模块服务 */
	public function registerServices(DiInterface $di){
		// 注册：视图
		$di->set('view', function(){
			$view = new View();
			$view->setDI($this);
			$view->setViewsDir(__DIR__.'/view/');
			$view->registerEngines([
				'.php'=>'Phalcon\\Mvc\\View\\Engine\\Php'
			]);
			return $view;
		});
	}

}