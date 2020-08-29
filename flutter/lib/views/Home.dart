import 'package:flutter/material.dart';

import 'package:webmis/env.dart';
import 'package:webmis/library/ui/ui.dart';
import 'package:webmis/library/ui/ui-icons.dart';
import 'package:webmis/library/ui/ui-color.dart';

import 'package:webmis/views/index/Index.dart';
import 'package:webmis/views/index/Msg.dart';
import 'package:webmis/views/index/Me.dart';

class Home extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _HomeState();
}
class _HomeState extends State<Home> {

  // 导航内容
  int _currentIndex = 1;
  final List<Widget> _pages = [Msg(),Index(),Me()];
  PageController _pageController = PageController(initialPage:1);

  /* 构造函数 */
  @override
  void initState() {
    super.initState();
  }

  /* Widget */
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            color: uiColor('#FF0000'),
            width: double.infinity,
            height: double.infinity,
            margin: EdgeInsets.only(bottom:50),
            child: PageView.builder(
              // 保存状态
              physics: NeverScrollableScrollPhysics(),
              controller: _pageController,
              onPageChanged: _changeTab,
              // 回调
              itemCount: _pages.length,
              itemBuilder: (context, index) => _pages[index],
            ),
          ),
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              width: double.infinity,
              height: 50,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: _tabs(context),
              ),
            ),
          ),
        ],
      ),
    );
  }

  /* 导航菜单 */
  List<Widget> _tabs(context){
    final _width = MediaQuery.of(context).size.width/1;
    final _height = double.infinity;
    return [

      // 首页
      GestureDetector(
        behavior: HitTestBehavior.opaque,
        child: Container(
          width: _width,
          height: _height,
          color: uiColor('#FFFFFF'),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Icon(uiIcons.home,color: uiColor(_currentIndex==1?Env.color['primary']:Env.color['info']),),
              Ui.text('首页',fontSize:9,color: _currentIndex==1?Env.color['primary']:Env.color['info']),
            ],
          ),
        ),
        onTap: ()=> _changeTab(1),
      ),
      
    ];
  }

  /* 切换导航 */
  void _changeTab(int index){
    if(index!=_currentIndex){
      setState(()=> _currentIndex=index );
      _pageController.jumpToPage(index);
    }
  }
}