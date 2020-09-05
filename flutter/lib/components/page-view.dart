import 'package:flutter/material.dart';
import 'dart:ui';
import 'dart:io';
import 'package:flutter/services.dart';

import 'package:webmis/env.dart';
import 'package:webmis/library/ui/ui-color.dart';

/* 页面布局 */
class WmPageView extends StatefulWidget {
  final bool immersed;
  final Widget slotTitle;
  final Widget slotLeft;
  final Widget slotRight;
  final Widget slotBody;
  final Color bgColor;
  final String statusBar;
  const WmPageView({
    Key key,
    this.immersed: false,
    this.slotTitle,
    this.slotLeft,
    this.slotRight,
    this.slotBody,
    this.bgColor,
    this.statusBar: 'dark',
  }): super(key: key);
  @override
  State<StatefulWidget> createState() => WmPageViewState();
}
class WmPageViewState extends State<WmPageView> {

  /* 属性 */
  double _statusHeight; //状态栏高度
  double _topHeight;  //头部高度

  /* 构造函数 */
  @override
  void initState() {
    super.initState();
    /* 状态栏颜色 */
    if(Platform.isAndroid){
      SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
        statusBarIconBrightness: this.widget.statusBar=='dark'?Brightness.dark:Brightness.light
      ));
    }
  }

  /* 销毁 */
  @override
  void dispose(){
    super.dispose();
  }

  /* Widget */
  @override
  Widget build(BuildContext context) {
    // 状态栏高度
    _statusHeight = MediaQueryData.fromWindow(window).padding.top;
    _topHeight = Env.statusBar['height']+_statusHeight+10.0;
    return Stack(
      children: [
        // 内容
        Container(
          width: double.infinity,
          height: double.infinity,
          padding: EdgeInsets.only(
            top: this.widget.immersed?0.0:_topHeight,
          ),
          child: this.widget.slotBody,
        ),
        // 头部
        Container(
          color: this.widget.bgColor!=null?this.widget.bgColor:uiColor(Env.statusBar['bgColor']),
          padding: EdgeInsets.only(top: _statusHeight+5.0,bottom: 5.0, left: 10.0, right: 10.0),
          height: _topHeight,
          child: Stack(
            fit: StackFit.expand,
            children: _getHeader(),
          ),
        ),
      ],
    );
  }

  /* 获取头部内容 */
  List<Widget> _getHeader(){
    List<Widget> header=[];
    if(this.widget.slotTitle!=null) header.add(this.widget.slotTitle);
    if(this.widget.slotLeft!=null) header.add(Positioned(left: 0, top: 0, bottom: 0, child: this.widget.slotLeft));
    if(this.widget.slotRight!=null) header.add(Positioned(right: 0, top: 0, bottom: 0, child: this.widget.slotRight));
    return header;
  }

}