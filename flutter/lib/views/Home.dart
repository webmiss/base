import 'package:flutter/material.dart';

import 'package:webmis/env.dart';
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
      body: PageView.builder(
        // 保存状态
        physics: NeverScrollableScrollPhysics(),
        controller: _pageController,
        onPageChanged: _changeTab,
        // 回调
        itemCount: _pages.length,
        itemBuilder: (context, index) => _pages[index],
      ),
      // 导航
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        selectedItemColor: uiColor(Env.color['primary']),
        unselectedItemColor: uiColor(Env.color['info']),
        selectedFontSize: 9,
        unselectedFontSize: 9,
        selectedLabelStyle: TextStyle(height: 1.4),
        iconSize: 26,
        items: [
          BottomNavigationBarItem(title: Text('消息'), icon: Icon(IconData(0xe902, fontFamily: 'icomoon')),),
          BottomNavigationBarItem(title: Text('首页'), icon: Icon(IconData(0xe900, fontFamily: 'icomoon')),),
          BottomNavigationBarItem(title: Text('我的'), icon: Icon(IconData(0xe901, fontFamily: 'icomoon')),),
        ],
        currentIndex: _currentIndex,
        onTap: (index){
          // 切换页面
          _pageController.jumpToPage(index);
        },
      ),
    );
  }

  /* 切换导航 */
  void _changeTab(int index){
    setState(()=> _currentIndex=index );
  }
}