<?php
// 允许跨域请求
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:*');
header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');

// 中转参数
echo json_encode($_GET);