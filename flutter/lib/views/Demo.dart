import 'package:flutter/material.dart';

class Demo extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => DemoState();
}

class DemoState extends State<Demo> {
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text('测试', style: TextStyle(fontSize: 16)),
        iconTheme: IconThemeData(color: Colors.white),
        textTheme: TextTheme(title: TextStyle(fontSize: 18, color: Colors.white)),
      ),
      body: new Center(
        child: new Text("测试内容"),
      ),
    );
  }
}