import 'package:flutter/material.dart';

class Cart extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => CartState();
}

class CartState extends State<Cart> {
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text('购物车', style: TextStyle(fontSize: 16)),
      ),
      body: new Center(
        child: new Text("购物车"),
      ),
    );
  }
}