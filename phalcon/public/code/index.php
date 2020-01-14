<?php
// 允许跨域请求
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:*');
header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');

// 中转参数
if(!empty($_GET['t'])){
  echo json_encode(['code'=>0,'type'=>$_GET['t'],'id'=>$_GET['id']]);
}