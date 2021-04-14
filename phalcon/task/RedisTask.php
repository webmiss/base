<?php
declare(strict_types=1);
namespace Task;

use Config\Env;
use Config\Redis as cfg;
use Library\Redis;
use Library\FileEo;

/* 日志 */
class RedisTask extends Base {

  /* 消费者 */
  function logsAction() {
    while(true){
      $redis = new Redis();
      $data = $redis->BLPop('logs', cfg::Default()['timeout']);
      $redis->Close();
      if(empty($data)) continue;
      // 保存
      $msg = $data[1];
      $res = self::_logsWrite($msg);
      if(!$res){
        self::Print('[Logs] Write:', '日志记录失败!');
        self::Print($msg);
      }
    }
  }

  /* 写入 */
  private static function _logsWrite(string $msg): bool {
    // 数据
    $data = json_decode($msg, true);
    // 时间
    $ctime = date("Y-m-d H:i:s");
    $year = substr($ctime, 0, 4);
    $month = substr($ctime, 5, 2);
    $day = substr($ctime, 8, 2);
    // 目录
    $name = (string)$data['type'];
    $path = 'upload/logs/' . $name . '/' . $year . '/' . $month . '/';
    FileEo::$Root = Env::$root_dir;
    if(!FileEo::Mkdir($path)){
      self::Print('[Logs] Mkdir:', '创建目录失败!');
      return false;
    }
    // 追加
    $file = $path . $day . '.text';
    $content = json_encode($data['data']);
    return FileEo::WriterEnd($file, '['.$name.'] '.$ctime.' '.$content."\n");
  }

}