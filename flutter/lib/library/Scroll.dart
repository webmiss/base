import 'dart:async';

import 'package:flutter/material.dart';
import 'package:webmis/config.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';

class Scroll extends StatefulWidget {

  // 参数
  final Function onRefresh;
  final Function onLoad;
  final Widget child;
  const Scroll({Key key, this.onRefresh, this.onLoad, this.child}): super(key: key);

  @override
  State<StatefulWidget> createState() => new ScrollState();
}

class ScrollState extends State<Scroll> {

  RefreshController _refreshController = RefreshController(initialRefresh: false);

  /* 上拉刷新 */
  Future _onRefresh() async {
    await this.widget.onRefresh();
    _refreshController.refreshCompleted();
  }

  /* 上拉加载 */
  Future _onLoad() async {
    await this.widget.onLoad();
    _refreshController.loadComplete();
  }

  @override
  Widget build(BuildContext context) {
    return SmartRefresher(
      controller: _refreshController,
      enablePullDown: true,
      enablePullUp: true,
      // header: WaterDropHeader(),
      header: CustomHeader(
        builder: (BuildContext context,RefreshStatus mode){
          final size =MediaQuery.of(context).size;
          String msg ;
          if(mode==RefreshStatus.idle) msg =  Inc.name;
          else if(mode==RefreshStatus.refreshing) msg =  '正在加载...';
          else if(mode == RefreshStatus.failed) msg = '刷新失败！点击重试';
          else if(mode == RefreshStatus.canRefresh) msg = '刷新数据';
          else msg = '刷新成功';
          return Stack(
            children: <Widget>[
              Container(
                height: size.height,
                color: Inc.getColor(Inc.themeColor),
              ),
              Positioned(
                bottom: 10,
                left: 0,
                right: 0,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Icon(IconData(0xe100, fontFamily: 'icomoon'), size: 32, color: Colors.white,),
                    Text(msg, style: TextStyle(height: 1.8, fontSize: 12, color: Colors.white)),
                  ],
                ),
              ),
            ],
          );
        }
      ),
      footer: CustomFooter(
        builder: (BuildContext context,LoadStatus mode){
          String msg ;
          if(mode==LoadStatus.idle) msg =  Inc.copy;
          else if(mode==LoadStatus.loading) msg =  '正在加载...';
          else if(mode == LoadStatus.failed) msg = '加载失败！点击重试';
          else if(mode == LoadStatus.canLoading) msg = '加载更多';
          else msg = '没有更多数据了!';
          return Offstage(
            offstage: false,
            child: Container(
              height: 60,
              child: Center(child:Text(msg, style: TextStyle(height: 1.8, fontSize: 12, color: Colors.grey)),),
            ),
          );
        }
      ),
      onRefresh: _onRefresh,
      onLoading: _onLoad,
      child: this.widget.child,
    );
  }
}