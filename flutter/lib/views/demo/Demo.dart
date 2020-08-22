import 'package:flutter/material.dart';

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

  /* Widget */
  @override
  Widget build(BuildContext context) {
    /* 显示 */
    return Scaffold(
      body: Center(
        child: _listView(),
      ),
    );
  }

  /* ListView */
  Widget _listView(){
    return ListView(
      padding: const EdgeInsets.all(8),
      children: <Widget>[
        Container(
          height: 360,
          color: Colors.amber[600],
          child: const Center(child: Text('Entry A')),
        ),
        Container(
          height: 360,
          color: Colors.amber[500],
          child: const Center(child: Text('Entry B')),
        ),
        Container(
          height: 360,
          color: Colors.amber[100],
          child: const Center(child: Text('Entry C')),
        ),
      ],
    );
  }

}