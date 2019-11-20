<?php

namespace app\model;

class Msg extends BaseModel{

  public $id;

  /* 数据表 */
	public function getSource(){
		return "web_msg";
  }

}
