import 'package:flutter/material.dart';
import 'package:webmis/library/ui/ui-color.dart';

/* 滑动视图 */
Widget scrollView({
  List<Widget> slotHtml,
  bool scrollX: false,
  bool scrollY: true,
  Function swipe,
  double limit: 60,
  String bgColor: '#F2F4F6',
}){

  /* 参数 */
  final _sp = scrollX?'x':'y';
  Map<String, double> _startPage;
  Map<String, double> _movePage;

  /* 开始 */
  void _start(DragStartDetails e){
    _movePage = {'x':0.0,'y':0.0};
    _startPage = {'x': e.globalPosition.dx,'y': e.globalPosition.dy,};
  }

  /* 移动 */
  void _move(DragUpdateDetails e){
    _movePage = {
      'x': e.globalPosition.dx-_startPage['x'],
      'y': e.globalPosition.dy-_startPage['y'],
    };
  }

  /* 移动 */
  void _end(DragEndDetails e){
    // 滑动方向
    final ratio = (_movePage['x']/_movePage['y']).abs();
    if(ratio>1 && _movePage['x']>limit) swipe('left');
    else if(ratio>1 && _movePage['x']<-limit) swipe('right');
    else if(ratio<1 && _movePage['y']>limit) swipe('down');
    else if(ratio<1 && _movePage['y']<-limit) swipe('up');
  }

  /* 结果 */
  return GestureDetector(
    onHorizontalDragStart: _start,
    onHorizontalDragUpdate: _move,
    onHorizontalDragEnd: _end,
    child: Container(
      color: uiColor(bgColor),
      child: ListView(
        padding: EdgeInsets.only(top:0.0),
        children: slotHtml,
      ),
    ),
  );

}