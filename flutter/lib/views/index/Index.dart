import 'package:flutter/material.dart';

import 'package:webmis/library/ui/ui-color.dart';
import 'package:webmis/components/page-view.dart';

class Index extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => IndexState();
}
class IndexState extends State<Index> with AutomaticKeepAliveClientMixin {

  /* 保存状态 */
  @override 
  bool get wantKeepAlive => true;

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
        slotLeft: Center(
          child: Text('五华区'),
        ),
        slotBody: Center(
          child: Text('首页'),
        ),
      ),
    );
  }

}