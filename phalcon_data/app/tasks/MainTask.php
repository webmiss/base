<?php

use app\model\User;

class MainTask extends Base{
  function mainAction(){
    $data = User::findFirst();
    print_r($data->toArray());

  }
}