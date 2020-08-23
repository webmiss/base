import 'package:flutter/material.dart';

class Me extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => MeState();
}
class MeState extends State<Me> with AutomaticKeepAliveClientMixin {

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
  // ignore: must_call_super
  Widget build(BuildContext context) {
    /* 显示 */
    return Scaffold(
      body: Center(
        child: Text('我的'),
      ),
    );
  }

}