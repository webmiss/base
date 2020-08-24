import 'package:flutter/material.dart';

import 'package:webmis/library/ui/ui.dart';
import 'package:webmis/library/ui/ui-color.dart';
import 'package:webmis/library/ui/ui-navigator-to.dart';

import 'package:webmis/components/page-view.dart';
import 'package:webmis/components/scroll-view.dart';

class Demo extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => DemoState();
}
class DemoState extends State<Demo> {

  /* 属性 */
  List<int> lists = [0,1,2,3,4,5,6,7,8,9];

  /* 构造函数 */
  @override
  void initState() {
    super.initState();
  }

  /* Widget */
  @override
  Widget build(BuildContext context) {
    /* 显示 */
    return Scaffold(
      body: pageView(
        slotLeft:Ui.back(context),
        slotTitle: Ui.title('Demo'),
        slotBody: scrollView(
          swipe: (res){ if(res=='left'){ NavigatorTo.pop(context); } },
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
            child: Ui.text(s.toString(),fontSize: 14),
          ),
        )
      );
    }
    return _html;
  }

}