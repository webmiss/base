<?php

namespace app\library;

/* 坐标转换 */
class GPS {

  static private $PI = 3.14159265358979324;
  static private $x_pi = 0;

  /* WGS-84 to GCJ-02 */
  static function wgs_gcj($wgsLat, $wgsLon){
    if (!self::isInChina($wgsLat, $wgsLon)) return ['lat' => $wgsLat, 'lon' => $wgsLon];
    $d = self::delta($wgsLat, $wgsLon);
    return ['lat' => $wgsLat + $d['lat'],'lon' => $wgsLon + $d['lon']];
  }

  /* GCJ-02 to WGS-84 */
  static function gcj_wgs($gcjLat, $gcjLon){
    $initDelta = 0.01;
    $threshold = 0.000000001;
    $dLat = $initDelta; $dLon = $initDelta;
    $mLat = $gcjLat - $dLat; $mLon = $gcjLon - $dLon;
    $pLat = $gcjLat + $dLat; $pLon = $gcjLon + $dLon;
    $wgsLat = 0; $wgsLon = 0; $i = 0;
    while (TRUE) {
      $wgsLat = ($mLat + $pLat) / 2;
      $wgsLon = ($mLon + $pLon) / 2;
      $tmp = self::wgs_gcj($wgsLat, $wgsLon);
      $dLat = $tmp['lat'] - $gcjLat;
      $dLon = $tmp['lon'] - $gcjLon;
      if ((abs($dLat) < $threshold) && (abs($dLon) < $threshold)) break;
      if ($dLat > 0) $pLat = $wgsLat; else $mLat = $wgsLat;
      if ($dLon > 0) $pLon = $wgsLon; else $mLon = $wgsLon;
      if (++$i > 10000) break;
    }
    return ['lat' => $wgsLat, 'lon'=> $wgsLon];
  }

  /* GCJ-02 to BD-09 */
  static function gcj_bd($gcjLat, $gcjLon){
    $x = $gcjLon; $y = $gcjLat;  
    $z = sqrt($x * $x + $y * $y) + 0.00002 * sin($y * self::$x_pi);  
    $theta = atan2($y, $x) + 0.000003 * cos($x * self::$x_pi);  
    $bdLon = $z * cos($theta) + 0.0065;  
    $bdLat = $z * sin($theta) + 0.006; 
    return ['lat' => $bdLat,'lon' => $bdLon];
  }

  /* BD-09 to GCJ-02 */
  static function bd_gcj($bdLat, $bdLon){
    $x = $bdLon - 0.0065; $y = $bdLat - 0.006;  
    $z = sqrt($x * $x + $y * $y) - 0.00002 * sin($y * self::$x_pi);  
    $theta = atan2($y, $x) - 0.000003 * cos($x * self::$x_pi);  
    $gcjLon = $z * cos($theta);
    $gcjLat = $z * sin($theta);
    return array('lat' => $gcjLat, 'lon' => $gcjLon);
  }

  /* WGS-84 to Web mercator */
  static function wgs_mercator($wgsLat, $wgsLon){
    $x = $wgsLon * 20037508.34 / 180.;
    $y = log(tan((90. + $wgsLat) * self::$PI / 360.)) / (self::$PI / 180.);
    $y = $y * 20037508.34 / 180.;
    return array('lat' => $y, 'lon' => $x);
  }

  /* Web mercator to WGS-84 */
  static function mercator_wgs($mercatorLat, $mercatorLon){
    $x = $mercatorLon / 20037508.34 * 180.;
    $y = $mercatorLat / 20037508.34 * 180.;
    $y = 180 / self::$PI * (2 * atan(exp($y * self::$PI / 180.)) - self::$PI / 2);
    return array('lat' => $y, 'lon' => $x);
  }

  /* 是否在中国 */
  static private function isInChina($lat, $lon){
    $region = array(
      self::rectangle(79.446200, 49.220400, 96.330000,42.889900),
      self::rectangle(109.687200, 54.141500, 135.000200, 39.374200),
      self::rectangle(73.124600, 42.889900, 124.143255, 29.529700),
      self::rectangle(82.968400, 29.529700, 97.035200, 26.718600),
      self::rectangle(97.025300, 29.529700, 124.367395, 20.414096),
      self::rectangle(107.975793, 20.414096, 111.744104, 17.871542),
    );
    $exclude = array(
      self::rectangle(119.921265, 25.398623, 122.497559, 21.785006),
      self::rectangle(101.865200, 22.284000, 106.665000, 20.098800),
      self::rectangle(106.452500, 21.542200, 108.051000, 20.487800),
      self::rectangle(109.032300, 55.817500, 119.127000, 50.325700),
      self::rectangle(127.456800, 55.817500, 137.022700, 49.557400),
      self::rectangle(131.266200, 44.892200, 137.022700, 42.569200),
    );
    for ($i = 0; $i < count($region); $i++)
      if (self::isInRect($region[$i], $lon, $lat)){
        for ($j = 0; $j< count($exclude); $j++){
          if (self::isInRect($exclude[$j], $lon, $lat)){return false;}
        }
        return true;
      }
    return false;
  }
  static private function rectangle($lng1, $lat1, $lng2, $lat2) {
    return [
      'west' => min($lng1, $lng2),
      'north' => max($lat1, $lat2),
      'east' => max($lng1, $lng2),
      'south' => min($lat1, $lat2),
    ];
  }
  static private function isInRect($rect, $lon, $lat) {
      return $rect['west'] <= $lon && $rect['east'] >= $lon && $rect['north'] >= $lat && $rect['south'] <= $lat;
  }

  // 平面
  static private function delta($lat, $lon){
    $a = 6378245.0;//  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    $ee = 0.00669342162296594323;//  ee: 椭球的偏心率。
    $dLat = self::transformLat($lon - 105.0, $lat - 35.0);
    $dLon = self::transformLon($lon - 105.0, $lat - 35.0);
    $radLat = $lat / 180.0 * self::$PI;
    $magic = sin($radLat);
    $magic = 1 - $ee * $magic * $magic;
    $sqrtMagic = sqrt($magic);
    $dLat = ($dLat * 180.0) / (($a * (1 - $ee)) / ($magic * $sqrtMagic) * self::$PI);
    $dLon = ($dLon * 180.0) / ($a / $sqrtMagic * cos($radLat) * self::$PI);
    return array('lat' => $dLat, 'lon' => $dLon);
  }
  // 经度
  static private function transformLon($x, $y) {
    $ret = 300.0 + $x + 2.0 * $y + 0.1 * $x * $x + 0.1 * $x * $y + 0.1 * sqrt(abs($x));
    $ret += (20.0 * sin(6.0 * $x * self::$PI) + 20.0 * sin(2.0 * $x * self::$PI)) * 2.0 / 3.0;
    $ret += (20.0 * sin($x * self::$PI) + 40.0 * sin($x / 3.0 * self::$PI)) * 2.0 / 3.0;
    $ret += (150.0 * sin($x / 12.0 * self::$PI) + 300.0 * sin($x / 30.0 * self::$PI)) * 2.0 / 3.0;
    return $ret;
  }
  // 纬度
  static private function transformLat($x, $y) {
    $ret = -100.0 + 2.0 * $x + 3.0 * $y + 0.2 * $y * $y + 0.1 * $x * $y + 0.2 * sqrt(abs($x));
    $ret += (20.0 * sin(6.0 * $x * self::$PI) + 20.0 * sin(2.0 * $x * self::$PI)) * 2.0 / 3.0;
    $ret += (20.0 * sin($y * self::$PI) + 40.0 * sin($y / 3.0 * self::$PI)) * 2.0 / 3.0;
    $ret += (160.0 * sin($y / 12.0 * self::$PI) + 320 * sin($y * self::$PI / 30.0)) * 2.0 / 3.0;
    return $ret;
  }

}