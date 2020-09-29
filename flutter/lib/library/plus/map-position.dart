import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webmis/library/plus/map-html.dart';

/* 地图-获取坐标 */
class MapPosition extends StatefulWidget {
  // 参数
  final Function controller;
  final javascript;
  final String img;
  const MapPosition({
    Key key,
    this.controller,
    this.javascript,
    this.img: 'https://webmis.vip/themes/home/img/logo.svg',
  }): super(key: key);
  @override
  State<StatefulWidget> createState() => MapPositionState();
}
class MapPositionState extends State<MapPosition> {

  String _html; //Html内容
  WebViewController _controller;
  String _img;

  /* 构造函数 */
  @override
  void initState() {
    super.initState();
    setState(()=>_img=this.widget.img);
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

  /* 销毁 */
  @override
  void dispose(){
    super.dispose();
  }

  /* 加载完成 */
  Future _onload(String url) async {
    this.widget.controller(this);
  }
  /* 回调JS */
  List<JavascriptChannel> _setJavaScript() {
    List<Map> data = this.widget.javascript;
    return List.generate(data.length, (index) {
      return JavascriptChannel(
        name: data[index]['name'],
        onMessageReceived: data[index]['msg'],
      );
    });
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
<div class="map_tool map_tool_location" onclick="reLocation()"></div>
<div class="map_marker map_me">
  <div class="map_marker_img" style="background-image: url($_img)"></div>
</div>
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
/* 回调-重新定位 */
const reLocation = ()=>{
  getLocation.postMessage('');
}
/* 回调-地图移动 */
map.on('moveend', ()=>{
  const center = map.getCenter();
  getPosition.postMessage(JSON.stringify(center));
});
</script>
    ''';
    return MapHtml.htmlBase64(title: '高德地图',html: _html);
  }

}