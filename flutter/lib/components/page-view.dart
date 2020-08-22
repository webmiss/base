import 'package:flutter/material.dart';
import 'dart:ui';
import 'dart:io';
import 'package:flutter/services.dart';

import 'package:webmis/env.dart';
import 'package:webmis/library/ui/ui-color.dart';

/* 页面布局 */
Widget pageView({
  Widget slotTitle,
  Widget slotLeft,
  Widget slotRight,
  Widget slotBody,
  Widget bgColor,
  String statusBar: 'dark',
  bool immersed: false,
}){
  
  /* 状态栏颜色 */
  if(Platform.isAndroid){
    Brightness _statusType = statusBar=='dark'?Brightness.dark:Brightness.light;
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
      statusBarIconBrightness: _statusType
    ));
  }

  /* 是否沉浸式 */
  if(immersed) return Container(child: slotBody);

  /* 自定义头部 */
  List<Widget> header = [];
  // 头部-内容
  if(slotTitle!=null){
    header.add(slotTitle);
  }
  // 头部-左侧
  if(slotLeft!=null){
    header.add(
      Positioned(
        left: 0,
        top: 0,
        bottom: 0,
        child: slotLeft,
      ),
    );
  }
  // 头部-右侧
  if(slotRight!=null){
    header.add(
      Positioned(
        right: 0,
        top: 0,
        bottom: 0,
        child: slotRight,
      ),
    );
  }
  // 状态栏高度
  double _statusHeight = MediaQueryData.fromWindow(window).padding.top;
  double _height = Env.statusBar['height']+_statusHeight+10.0;
  return Stack(
    children: [
      // 内容
      Container(
        padding: EdgeInsets.only(
          top: _height,
        ),
        child: slotBody,
      ),
      // 头部
      Container(
        color: bgColor!=null?bgColor:uiColor(Env.statusBar['bgColor']),
        padding: EdgeInsets.only(top: _statusHeight+5.0,bottom: 5.0, left: 10.0, right: 10.0),
        height: _height,
        child: Stack(
          fit: StackFit.expand,
          children: header,
        ),
      ),
    ],
  );

}