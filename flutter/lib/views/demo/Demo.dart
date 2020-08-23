import 'package:flutter/material.dart';

import 'package:webmis/library/ui/ui-color.dart';
import 'package:webmis/components/page-view.dart';
import 'package:webmis/components/scroll-view.dart';

class Demo extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => DemoState();
}
class DemoState extends State<Demo> {

  /* 构造函数 */
  @override
  void initState() {
    super.initState();
  }

  /* 数据 */
  var lists = [0,1,2,3,4,5,6,7,8,9];

  /* Widget */
  @override
  Widget build(BuildContext context) {
    /* 显示 */
    return Scaffold(
      body: pageView(
        slotLeft:GestureDetector(
          child: Container(
            width: 40,
            child: Icon(IconData(0xe903, fontFamily: 'wmui'),size: 22,color:uiColor('#FF6600'),),
          ),
          onTap: () => Navigator.pop(context,'参数'),
        ),
        slotTitle: Center(
          child: Text(
            'Demo',
            style: TextStyle(fontSize: 18,color: uiColor('#333333')),
          ),
        ),
        slotBody: scrollView(
          swipe: (res){ if(res=='left'){ Navigator.pop(context); } },
          slotHtml: _listView(),
        ),
      ),
    );
  }

  /* ListView */
  List<Widget> _listView(){
    // 循环
    List<Widget> _html = [];
    for(var s in lists){
      _html.add(
        Container(
          margin: EdgeInsets.only(top:1),
          height: 120,
          color: uiColor('#FFFFFF'),
          child: Center(
            child: Text(s.toString(),style: TextStyle(fontSize: 16),),
          ),
        )
      );
    }
    return _html;
  }

}