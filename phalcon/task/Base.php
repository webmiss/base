<?php
declare(strict_types=1);
namespace Task;

use Phalcon\Cli\Task;

class Base extends Task {

  /* 输出到控制台 */
  static function Print(...$content): void {
    foreach($content as $val){
      print_r($val); echo ' ';
    }
    echo "\n";
  }

}