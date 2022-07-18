<?php
namespace Service;

use Library\FileEo;

/* 日志 */
class Logs extends Base {

  /* 写入文件 */
  static function File(string $file='', $content=''){
    FileEo::WriterEnd($file, json_encode($content)."\n");
  }

}