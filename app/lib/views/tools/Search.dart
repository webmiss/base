import 'package:flutter/material.dart';
import 'package:loader_search_bar/loader_search_bar.dart';

class Search extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => SearchState();
}

class SearchState extends State<Search> {

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: SearchBar(
        defaultBar: AppBar(
          title: Text('搜索商品', style: TextStyle(fontSize: 16)),
        ),
      ),
      body: new Center(
        child: Text('内容部分'),
      ),
    );
  }
}