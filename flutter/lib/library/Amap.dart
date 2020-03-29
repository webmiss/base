import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class AmapShow extends StatefulWidget {

  // 参数
  final Function controller;
  final javascript;
  const AmapShow({Key key, this.controller, this.javascript}): super(key: key);

  @override
  State<StatefulWidget> createState() => new AmapShowState();
}

class AmapShowState extends State<AmapShow> {

  var _controller;
  
  @override
  Widget build(BuildContext context) {

    // 内容处理
    final String contentBase64 = base64Encode(const Utf8Encoder().convert(_htmlContent));

    // 控制器
    Future _setController(String url) async {
      this.widget.controller(_controller);
    }

    // 回调JavaScript
    List<JavascriptChannel> _setJavaScript() {
      List<List> data = this.widget.javascript;
      return List.generate(data.length, (index) {
        return JavascriptChannel(
          name: data[index][0],
          onMessageReceived: data[index][1],
        );
      });
    }

    return WebView(
      // initialUrl:'https://webmis.vip/',
      initialUrl: 'data:text/html;charset=utf-8;base64,$contentBase64',
      javascriptMode: JavascriptMode.unrestricted,
      // 创建成功
      onWebViewCreated: (WebViewController webViewController){
        _controller = webViewController;
      },
      // 加载完成
      onPageFinished: _setController,
      // 回调JS
      javascriptChannels: _setJavaScript().toSet(),
    );
  }
}

/* Html内容 */
const _htmlContent = '''
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>高德地图</title>
  </head>
  <body>
    <div id="map">
      <div class="map_load">初始化地图</div>
    </div>
    <button onclick="callFlutter()">callFlutter</button>
<style>
*{margin: 0; padding: 0;}
html,body,#map{height: 100%; text-align: center; background-color: #F2F2F2;}
.map_load{position: absolute; height: 30px; line-height: 30px; top: 0; bottom: 0; left: 0; right: 0; margin: auto;}
.amap-icon img,.amap-marker-content img{width: 20px;height: 25px;}
</style>
  </body>
</html>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=c526dde052bd47c221103ae04176cc3c&plugin=AMap.Geocoder"></script>
<script>
// 
var maps = null;
var marker = null;

/* 打开地图 */
function openMap(position){
  if(!maps) maps = new AMap.Map("map", {resizeEnable: true, zoom: 14});
  if(position) maps.setCenter(position);
}

/* 设置中心 */
function setCenter(position){
  maps.setCenter(position);
}

/* 标记 */
function addMarker(position,icon){
  marker = new AMap.Marker({position:position,icon: icon});
  maps.add(marker);
}

/* 回调Flutter */
function callFlutter(){
  Toast.postMessage("JS调用了Flutter");
}

</script>
''';