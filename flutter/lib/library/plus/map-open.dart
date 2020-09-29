import 'package:flutter/material.dart';
import 'package:webmis/library/plus/app-info.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webmis/library/ui/ui-toast.dart';

/* 地图-打开导航 */
class MapOpen {
  static Future amap(BuildContext context, {String lon: '102.703689', String lat:'25.048474', String poiname: ''}) async {
    Map res = await appInfo();
    final String platform = res['platform']=='Android'?'android':'ios';
    String url = '${platform}amap://navi?sourceApplication=appname&amp;poiname=$poiname&amp;lat=$lat&amp;lon=$lon&amp;dev=0&amp;style=2';
    if(await canLaunch(url)){
      await launch(url);
    }else{
      Toast(context, '请安装高德地图!');
    }
  }
}