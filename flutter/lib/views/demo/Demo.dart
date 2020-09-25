import 'package:flutter/material.dart';
import 'package:webmis/library/ui/ui.dart';
import 'package:webmis/library/ui/ui-color.dart';
import 'package:webmis/library/ui/ui-navigator-to.dart';
import 'package:webmis/library/inc/time-set.dart';

import 'package:webmis/components/page-view.dart';
import 'package:webmis/components/scroll-view.dart';

class Demo extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => DemoState();
}
class DemoState extends State<Demo> {

  /* 属性 */
  List<int> lists;

  /* 构造函数 */
  @override
  void initState() {
    super.initState();
    // 数据
    setState((){ lists = [0,1,2,3,4,5,6,7,8,9]; });
  }

  /* 下拉刷新 */
  Future _reFresh(res) async {
    setState((){ lists = [0,1,2,3,4,5,6,7,8,9]; });
  }

  /* 下拉刷新 */
  Future _upLoad(res) async {
    setTimeout((){
      for(var i=0; i<10; i++) lists.add(i);
      setState(()=> lists);
    },1000);
  }
  
  /* 销毁 */
  @override
  void dispose(){
    super.dispose();
  }

  /* Widget */
  @override
  Widget build(BuildContext context) {
    /* 显示 */
    return Scaffold(
      body: WmPageView(
        slotLeft: Ui.back(context),
        slotTitle: Ui.title('Demo'),
        slotBody: WmScrollView(
          down: _reFresh,
          up: _upLoad,
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
    setState(()=> lists);
    return _html;
  }

}