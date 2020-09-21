import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webmis/library/plus/map-html.dart';

/* 页面布局 */
class MapMarker extends StatefulWidget {
  // 参数
  final Function controller;
  final javascript;
  const MapMarker({
    Key key,
    this.controller,
    this.javascript,
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

  /* 加载完成 */
  Future _onload(String url) async {
    this.widget.controller(this);
  }
  /* 回调JS */
  List<JavascriptChannel> _setJavaScript() {
    List<List> data = this.widget.javascript;
    return List.generate(data.length, (index) {
      return JavascriptChannel(
        name: data[index][0],
        onMessageReceived: data[index][1],
      );
    });
  }

  /* 地图-中心点 */
  void setCenter(List<dynamic> center){
    if(center.length>0) _controller.evaluateJavascript('setCenter(['+center[0].toString()+','+center[1].toString()+'])');
    else _controller.evaluateJavascript('setCenter()');
  }
  /* 地图-级别 */
  void setZoom(int zoom){
    _controller.evaluateJavascript('setZoom('+zoom.toString()+')');
  }
  /* 地图-点标记 */
  void addMarker(List markers){
    String str = '[';
    for(var val in markers){   
      str += '{title:"'+val["title"]+'",position:['+val['position'][0].toString()+','+val['position'][1].toString()+'],img:"'+val['img']+'"},';
    }
    str += ']';
    _controller.evaluateJavascript('addMarker('+str+')');
  }
  /* 地图-清除点标记 */
  void clearMarker(){
    _controller.evaluateJavascript('clearMarker()');
  }

  /* 销毁 */
  @override
  void dispose(){
    super.dispose();
  }

  /* Widget */
  @override
  Widget build(BuildContext context) {
    return WebView(
      initialUrl: _getHtml(),
      javascriptMode: JavascriptMode.unrestricted,
      onWebViewCreated: (WebViewController webViewController){
        _controller = webViewController;
      },
      // 加载完成
      onPageFinished: _onload,
      // 回调JS
      javascriptChannels: _setJavaScript().toSet(), 
    );
  }

  /* Html */
  String _getHtml(){
    _html = '''
<style>
</style>
<script type="text/javascript">
let allMarkers = [];
/* 地图 */
const map = new AMap.Map('map',{ resizeEnable: true });
/* 设置中心点 */
const setCenter = (center)=>{
  center = center || [102.703689,25.048474];
  map.setCenter(center);
}
/* 设置级别 */
const setZoom = (zoom)=>{
  zoom = zoom || 16;
  map.setZoom(zoom);
}
/* 点标记 */
const addMarker = (markers)=>{
  allMarkers = [];
  for(let i in markers){
    allMarkers.push(
      new AMap.Marker({
        content: '<div class="map_marker"><div class="map_marker_img" style="background-image: url('+markers[i].img+')"></div></div>',
        position:  markers[i].position,
        offset: new AMap.Pixel(-32, -64),
        title: markers[i].title,
      })
    );
  }
  map.add(allMarkers);
}
/* 点标记-清除 */
const clearMarker = ()=>{
  map.remove(allMarkers);
}
/* 回调-重新定位 */
function reLocation(){
  getLocation.postMessage('');
}
</script>
    ''';
    return MapHtml.htmlBase64(title: '高德地图',html: _html);
  }

}