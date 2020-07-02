import 'package:flutter/material.dart';

class Shop extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => ShopState();
}

class ShopState extends State<Shop> {
  
  @override
  Widget build(BuildContext context) {


    return Scaffold(
      appBar: AppBar(
        title: Text('商城', style: TextStyle(fontSize: 16)),
      ),
      body: Center(
        child: Text("商城内容"),
      ),
    );
  }
}