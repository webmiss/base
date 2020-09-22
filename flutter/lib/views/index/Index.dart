import 'package:flutter/material.dart';

import 'package:webmis/library/plus/map-geolocation.dart';
import 'package:webmis/library/ui/ui.dart';
import 'package:webmis/library/ui/ui-color.dart';
import 'package:webmis/library/ui/ui-svg.dart';
import 'package:webmis/library/ui/ui-navigator-to.dart';

import 'package:webmis/components/page-view.dart';
import 'package:webmis/views/demo/Demo.dart';

class Index extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => IndexState();
}
class IndexState extends State<Index> with AutomaticKeepAliveClientMixin {

  /* 保存状态 */
  @override 
  bool get wantKeepAlive => true;
  Map<String,dynamic> _location;

  /* 构造函数 */
  @override
  void initState() {
    super.initState();
    // 定位
    _getLocation();
  }

  /* 销毁 */
  @override
  void dispose(){
    super.dispose();
    MapGeolocation.dispose();
  }

  /* 定位 */
  Future<void> _getLocation() async {
    MapGeolocation.fetch(context).then((res){
      setState(()=> _location=res );
    });
  }

  /* Widget */
  @override
  // ignore: must_call_super
  Widget build(BuildContext context) {
    /* 显示 */
    return Scaffold(
      body: WmPageView(
        immersed: true,
        bgColor: Color.fromRGBO(0,0,0,0.0),
        slotLeft: Center(
          child: Text(
            _location!=null?(_location['district']!=''?_location['district']:'定位失败'):'正在定位'
          ),
        ),
        slotBody:Container(
          width: double.infinity,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment(0.0,-0.2),
              end: Alignment.bottomCenter,
              colors: [uiColor('#FFFFFF'),uiColor('#F2F4F6')],
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Logo
              Container(
                width: double.infinity,
                height: 62,
                child: uiSvg(src:'lib/assets/icon/logo.svg'),
              ),
              Container(
                child: Text(
                  'webmis.vip',
                  style: TextStyle(fontSize: 20,color: uiColor('#666666')),
                ),
              ),
              Container(
                height: 100,
                child: uiSvg(src:'lib/assets/icon/bg.svg'),
              ),
              GestureDetector(
                onTap: ()=> NavigatorTo.push(context,page: Demo()),
                child: Container(
                  width: 80,
                  height: 30,
                  child: Center(
                    child: Ui.text('[ Demo ]'),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

}