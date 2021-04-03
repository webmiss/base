<?php
declare(strict_types=1);
namespace Task;

use Phalcon\Cli\Task;

class MainTask extends Task {

  function mainAction() {
    echo "Cli";
  }

}