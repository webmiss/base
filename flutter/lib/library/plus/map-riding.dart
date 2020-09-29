import 'dart:convert' as convert;
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webmis/library/plus/map-html.dart';

/* 地图-骑行线路 */
class MapRiding extends StatefulWidget {
  // 参数
  final Function controller;
  final javascript;
  const MapRiding({
    Key key,
    this.controller,
    this.javascript,
  }): super(key: key);
  @override
  State<StatefulWidget> createState() => MapRidingState();
}
class MapRidingState extends State<MapRiding> {

  String _html; //Html内容
  WebViewController _controller;

  /* 构造函数 */
  @override
  void initState() {
    super.initState();
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
  /* 地图-线路 */
  void setRiding(src,dst){
    _controller.evaluateJavascript('setRiding('+convert.jsonEncode(src)+','+convert.jsonEncode(dst)+')');
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
<div class="map_tool map_tool_refresh" onclick="reLocation()"></div>
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
  map.clearMap();
  allMarkers = [];
  for(let i in markers){
    allMarkers.push(
      new AMap.Marker({
        content: '<div class="map_marker"><div class="map_marker_img" style="background-image: url('+markers[i].img+')"></div></div>',
        position:  markers[i].position,
        offset: new AMap.Pixel(-28, -56),
        title: markers[i].title,
      })
    );
  }
  map.add(allMarkers);
}
/* 规划路线-骑行 */
const setRiding = (src,dst)=>{
  // 标记
  addMarker([src,dst]);
  // 配置
  const riding = new AMap.Riding({
    map: map,
    policy: 1,
    hideMarkers: true,
    isOutline: false,
    autoFitView: true,
  });
  // 路线
  riding.search(src.position,dst.position, (status, result)=>{
    if(status === 'complete'){
      const data = result.routes[0].rides;
      let res = [];
      for(let i in data) res.push({action:data[i].action,text:data[i].instruction});
      getPanel.postMessage(JSON.stringify(res));
    }
  });
}
/* 回调-重新定位 */
const reLocation = ()=>{
  getLocation.postMessage('');
}
</script>
    ''';
    return MapHtml.htmlBase64(title: '高德地图',html: _html);
  }

}