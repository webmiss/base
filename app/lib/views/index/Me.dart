import 'package:flutter/material.dart';

class Me extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new MeState();
}

class MeState extends State<Me> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        padding: EdgeInsets.all(0.0),
        children: <Widget>[
          Image.network('https://fc3tn.baidu.com/it/u=1021050318,2936783095&fm=202&src=add_wise_exp', height: 200.0,fit: BoxFit.cover),
        ],
      ),
    );
  }
}