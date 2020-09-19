import 'dart:convert';
import 'package:webmis/env.dart';

/* 地图-Html */
class MapHtml {

  static String key = Env.amap['JSAPI_KEY'];
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
    <meta name="viewport" content="initial-scale=0.6, maximum-scale=0.6, user-scalable=no, viewport-fit=cover" />
    <script src="https://webapi.amap.com/maps?v=1.4.15&key=$key"></script>
<style>
html,body{overflow: hidden; margin: 0; padding: 0; height: 100%; text-align: center; font-size: 12px; background-color: #FFF;}
#map{height: calc(100% + 18px);}
.map_load{position: absolute; height: 30px; line-height: 30px; top: 0; bottom: 0; left: 0; right: 0; margin: auto;}
.amap-icon img,.amap-marker-content img{width: 20px;height: 25px;}
#map .amap-geo{display: none;}
</style>
  </head>
  <body>
    <div id="map"><div class="map_load">加载地图</div></div>
    $html
  </body>
</html>
    ''';
    // 转Base64
    return 'data:text/html;charset=utf-8;base64,'+base64Encode(const Utf8Encoder().convert(_html));
  }

}