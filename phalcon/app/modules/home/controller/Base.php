<?php
namespace app\modules\home\controller;

use Phalcon\Mvc\Controller;

/**
* 网站：公共控制器
*/
class Base extends Controller{
  /* 返回JSON */
  protected function getJSON($data=''){
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:*');
    header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
    return $this->response->setJsonContent($data);
  }
}
