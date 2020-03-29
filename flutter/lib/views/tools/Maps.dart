import 'package:flutter/material.dart';
import 'package:webmis/config.dart';
import 'package:webmis/library/Loading.dart';
import 'package:webmis/library/Alert.dart';
import 'package:webmis/library/Info.dart';

import 'package:webmis/library/Location.dart';
import 'package:webmis/library/Amap.dart';
import 'package:url_launcher/url_launcher.dart';

class Maps extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => MapsState();
}

class MapsState extends State<Maps> {

  var _controller;

  /* 打开地图 */
  Future<Null> openMap() async {
    String url;
    Info.appInfo().then((info) async {
      if(info['platform']=='Android'){
        url = 'androidamap://keywordNavi?sourceApplication=softname&keyword=宛委山景区&style=2';
      }else{
        url = 'iosamap://navi?sourceApplication=appname&amp;poiname=fangheng&amp;lat=36.547901&amp;lon=104.258354&amp;dev=1&amp;style=2';
      }
      if(await canLaunch(url)) await launch(url);
        else alert(context: context, title: '打开地图', body: '没有安装高德地图！');
    });
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text('高德地图', style: TextStyle(fontSize: 16)),
        backgroundColor: Colors.white,
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.location_on, color: Inc.getColor(Inc.themeColor),),
            onPressed: (){
              _controller.evaluateJavascript('addMarker([102.70501,25.05614],"https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png")');
            },
          )
        ],
      ),
      body: new Stack(
        children: <Widget>[
          loading(),
          AmapShow(
            controller:(res){
              // 控制器
              _controller=res;
              _controller.evaluateJavascript('openMap()');
              // 获取定位
              getLocation().then((res){
                if(res==null) return;
                // 打开地图
                String me = '['+res.longitude.toString()+','+res.latitude.toString()+']';
                _controller.evaluateJavascript('openMap('+me+')');
                // 标记
                _controller.evaluateJavascript('addMarker('+me+',"https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png")');
              });
            },
            javascript: [
              ['Toast',(res) {print(res.message);}]
            ],
          ),
          Positioned(
            left: 0,right: 0,
            bottom: 0,
            child: Container(
              height: 60,
              color: Inc.getColor(Inc.themeColor),
              alignment: Alignment.center,
              child: MaterialButton(
                child: Text('打开地图'),
                onPressed: openMap,
              ),
            ),
          ),
        ],
      ),
    );
  }
}