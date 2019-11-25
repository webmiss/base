import 'package:flutter/material.dart';

import 'package:webmis/views/index/Index.dart';
import 'package:webmis/views/index/Shop.dart';
import 'package:webmis/views/index/Cart.dart';
import 'package:webmis/views/index/Me.dart';

/* App首页 */
class Home extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _HomeState();
}
class _HomeState extends State<Home> {

  // 导航内容
  int _currentIndex = 0;
  final List<Widget> _page = [Index(),Shop(),Cart(),Me()];

  /* 销毁 */
  @override
  void dispose() {
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      // 内容
      body: _page[_currentIndex],
      // 导航
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _currentIndex,
        onTap: changeTab,
        selectedFontSize: 10,
        unselectedFontSize: 10,
        selectedLabelStyle: TextStyle(height: 1.4),
        iconSize: 24,
        items: [
          BottomNavigationBarItem(title: Text('首页'), icon: Icon(IconData(0xe900, fontFamily: 'icomoon')),),
          BottomNavigationBarItem(title: Text('商城'), icon: Icon(IconData(0xe901, fontFamily: 'icomoon')),),
          BottomNavigationBarItem(title: Text('购物车'), icon: Icon(IconData(0xe902, fontFamily: 'icomoon')),),
          BottomNavigationBarItem(title: Text('我的'), icon: Icon(IconData(0xe903, fontFamily: 'icomoon')),),
        ],
      ),
    );
  }

  /* 切换导航 */
  void changeTab(int index){
    setState((){_currentIndex = index;});
  }
  

}