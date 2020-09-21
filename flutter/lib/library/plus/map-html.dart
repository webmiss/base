import 'dart:convert';
import 'package:webmis/env.dart';

/* 地图-Html */
class MapHtml {

  static final String key = Env.amap['JSAPI_KEY'];
  static String _html;

  /* 公共 */
  static String htmlBase64({
    String title: '',
    String html: '',
  }){
    _html = '''
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>$title</title>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <script src = 'https://webapi.amap.com/maps?v=1.4.15&key=$key'></script>
<style>
html,body{overflow: hidden; margin: 0; padding: 0; height: 100%; text-align: center; font-size: 12px; background-color: #FFF;}
#map{position: absolute; width: 140%; height: calc(140% + 18px); top: -20%; left: -20%; transform: scale(0.8,0.8);}
.map_load{position: absolute; height: 30px; line-height: 30px; top: 0; bottom: 0; left: 0; right: 0; margin: auto;}
.map_marker{width: 56px; height: 54px; padding-top: 2px; background: url(https://webmis.vip/map/img/map_marker.svg) no-repeat center center; background-size: auto 100%;}
.map_marker_img{width: 42px; height: 42px; margin: 0 auto; background-color: #FFF; border-radius: 50%; background-repeat: no-repeat; background-position: center center; background-size: 100%;}
.map_tool{cursor: pointer; position: absolute; z-index: 99; right: 10px; bottom: 10px; width: 32px; height: 32px; background-color: #FFF; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.1); background-repeat: no-repeat; background-position: center center; background-size: 60%;}
.map_tool_location{background-image: url(https://webmis.vip/map/img/map_location.svg);}
/* 高德 */
#map .amap-geo{display: none;}
</style>
  </head>
  <body>
    <div class="map_tool map_tool_location" onclick="reLocation()"></div>
    <div id="map"><div class="map_load">加载地图</div></div>
    $html
  </body>
</html>
    ''';
    // 转Base64
    return 'data:text/html;charset=utf-8;base64,'+base64Encode(const Utf8Encoder().convert(_html));
  }

}