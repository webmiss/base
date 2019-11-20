<?php

namespace app\library\ali;

/* 高德地图 */
class Amap {
  // 参数
  static private $key='c526dde052bd47c221103ae04176cc3c';
  static private $url = 'https://restapi.amap.com/v3/';

  /* 坐标转换[gps,mapbar,baidu] */
  static function getConvert($locations,$coordsys){
    $res = file_get_contents(self::$url.'assistant/coordinate/convert?key='.self::$key.'&locations='.$locations.'&coordsys='.$coordsys);
    $data = json_decode($res);
    return $data->status==1?explode(',',$data->locations):'';
  }

}