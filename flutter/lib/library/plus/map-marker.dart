import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
// import 'package:webmis/library/plus/map-geolocation.dart';

import 'package:webmis/library/plus/map-html.dart';

/* 页面布局 */
class MapMarker extends StatefulWidget {

  final Function controller;
  const MapMarker({
    Key key,
    this.controller,
  }): super(key: key);
  @override
  State<StatefulWidget> createState() => MapMarkerState();
}
class MapMarkerState extends State<MapMarker> {

  String _html; //Html内容
  WebViewController _controller;

  /* 构造函数 */
  @override
  void initState() {
    super.initState();
  }

  /* 销毁 */
  @override
  void dispose(){
    super.dispose();
  }

  // 控制器
    Future _setController(String url) async {
      this.widget.controller(_controller);
    }

  /* Html */
  String _getHtml(){
    _html = '''
<style>
</style>
<script type="text/javascript">
window.onload = function(){
  var map = new AMap.Map('map', {
    resizeEnable: true,
    zoom: 14
  });
  // // 我的位置
  // var options = {
  //   'markerOptions':{
  //     'offset': new AMap.Pixel(-18, -36),
  //     'content':'<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
  //   },
  // };
  // AMap.plugin(["AMap.Geolocation"], function(){
  //   var geolocation = new AMap.Geolocation(options);
  //   map.addControl(geolocation);
  //   geolocation.getCurrentPosition();
  // });
}
</script>
    ''';
    return MapHtml.htmlBase64(title: '高德地图',html: _html);
  }

  /* Widget */
  @override
  Widget build(BuildContext context) {
    return WebView(
      initialUrl: _getHtml(),
      // initialUrl: 'https://webmis.vip/map/marker.html',
      javascriptMode: JavascriptMode.unrestricted,
      // 创建成功
      onWebViewCreated: (WebViewController webViewController){
        _controller = webViewController;
      },
      // 加载完成
      onPageFinished: _setController,
    );
  }
}