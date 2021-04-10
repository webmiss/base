<?php
declare(strict_types=1);
namespace Task;

class MainTask extends Base {

  function mainAction() {
    self::Print('Cli');
  }

}