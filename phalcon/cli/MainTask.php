<?php
declare(strict_types=1);
namespace Cli;

use Phalcon\Cli\Task;

class MainTask extends Task {

  function mainAction() {
    echo "Cli";
  }

}