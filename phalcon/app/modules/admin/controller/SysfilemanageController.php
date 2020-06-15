<?php

namespace app\modules\admin\controller;

use app\library\File;
use app\library\Down;

class SysFileManageController extends UserBase{

  static private $dirRoot = './';
  static private $userRoot = '';

  /* 初始化 */
  public function initialize(){
    parent::initialize();
    // 用户根目录
    self::$userRoot = self::$dirRoot;
    // self::$userRoot = self::$dirRoot.'/'.md5(self::$token->uid.$this->config->key);
    if (!is_dir(self::$userRoot)) mkdir(self::$userRoot,0777,true);
    // 文件类
    File::$file_root = self::$userRoot;
  }

  /* 列表 */
  function listAction(){
    $path = $this->request->get('path','string');
    $list = File::lists($path);
    return self::getJSON(['code'=>0,'url'=>$this->config->img_url,'data'=>$list]);
  }

  /* 新建文件夹 */
  function mkDirAction(){
    $path = $this->request->get('path','string');
    $name = $this->request->get('name','string');
    if(empty($path) || empty($name)) return self::getJSON(['code'=>4000]);
    return File::mkDir($path.$name)?self::getJSON(['code'=>0]):self::error(4021);
  }

  /* 打包 */
  function zipFileAction(){
    $path = $this->request->get('path','string');
    $name = $this->request->get('name','string');
    $files = $this->request->get('files');
    $files = json_decode($files,true);
    if(empty($path) || empty($name) || empty($files)) return self::getJSON(['code'=>4000]);
    $file = File::zipAll($path,$files,$name);
    if($file) echo readfile($file);
    return self::getJSON(['code'=>0]);
  }

  /* 重命名 */
  function reNameAction(){
    $path = $this->request->get('path','string');
    $rename = $this->request->get('rename','string');
    $name = $this->request->get('name','string');
    return File::reName($path.$rename,$path.$name)?self::getJSON(['code'=>0]):self::error(4021);
  }

  /* 上传 */
  function upFileAction(){
    $path = $this->request->get('path','string');
    if(empty($path)) return self::getJSON(['code'=>4000]);
    return File::upload($path,'up')?self::getJSON(['code'=>0]):self::error(4021);
  }

  /* 下载 */
  function downFileAction(){
    $path = $this->request->get('path','string');
    $fileName = $this->request->get('file','string');
    if(empty($path) || empty($fileName)) return self::getJSON(['code'=>4000]);
    // 文件流
    return Down::file(self::$userRoot.$path,$fileName);
  }

  /* 删除文件 */
  function rmFileAction(){
    $path = $this->request->get('path','string');
    $data = $this->request->get('data');
    $data = json_decode($data,true);
    if(empty($data)) return self::getJSON(['code'=>4000]);
    foreach($data as $val) File::delAll($path.$val);
    return self::getJSON(['code'=>0]);
  }

}