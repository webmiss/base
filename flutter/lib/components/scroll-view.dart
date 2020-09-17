import 'package:flutter/material.dart';
import 'package:webmis/env.dart';
import 'package:webmis/library/ui/ui-icons.dart';
import 'package:webmis/library/ui/ui-color.dart';
import 'package:webmis/library/ui/ui-loading.dart';

import 'package:webmis/library/inc/time-set.dart';


class WmScrollView extends StatefulWidget {

  // 参数
  final List<Widget> slotHtml;
  final bool scrollX;
  final double upper;
  final double lowerBoundary;
  final bool upperLoad;
  final IconData upperIcon;
  final String upperBg;
  final String upperColor;
  final double limit;
  final Color bgColor;
  // 事件
  final Function scroll;
  final Function up;
  final Function down;
  final Function left;
  final Function right;
  final Function swipe;

  const WmScrollView({
    Key key,
    this.slotHtml,
    this.scrollX: false,
    this.upper: 64,
    this.lowerBoundary: 50,
    this.upperLoad: true,
    this.upperIcon: uiIcons.loading,
    this.upperBg: '',
    this.upperColor: '',
    this.limit: 120,
    this.bgColor,
    this.scroll,
    this.up,
    this.down,
    this.left,
    this.right,
    this.swipe,
  }): super(key: key);

  @override
  State<StatefulWidget> createState() => WmScrollViewState();
}
class WmScrollViewState extends State<WmScrollView> {

  /* 属性 */
  String _sp; //方向
  ScrollController _controller;
  ScrollPosition _pos;
  Map<String, double> _html = {'w':0.0,'h':0.0};  //容器
  Map<String, double> _body = {'w':0.0,'h':0.0,'x':0.0,'y':0.0,'min':0.0,'max':0.0};  //内容
  Map<String, double> _startPage; //开始
  Map<String, double> _movePage;  //移动
  bool _isUpper = true;  //left、down
  bool _isLower = true;  //right、up
  double _upper;

  /* 构造函数 */
  @override
  void initState() {
    super.initState();
    // 滚动方向
    _sp = this.widget.scrollX?'x':'y';
    // 监听滑动
    _controller = ScrollController()..addListener(this._scroll);
    // Loading位置
    setState((){ _upper = -this.widget.upper; });
  }

  /* 销毁 */
  @override
  void dispose(){
    _controller.dispose();
    super.dispose();
  }

  /* 滑动-指定位置 */
  // void scrollTo({dynamic xy: 'min', int time: 400}){
  //   double offset;
  //   setTimeout((){
  //     if(xy=='min') offset = 0.0;
  //     else if(xy=='max'){
  //       double _max = _sp=='x'?_res['w']-_res['boxW']:_res['h']-_res['boxH'];
  //       offset = _max>0?_max:0.0;
  //       print(_max);
  //       print(offset);
  //     }else offset = xy;
  //     _controller.animateTo(offset, duration: Duration(milliseconds: time), curve: Curves.ease);
  //   },300);
  // }

  /* Widget */
  @override
  Widget build(BuildContext context) {
    _html['w'] = MediaQuery.of(context).size.width;
    _html['h'] = MediaQuery.of(context).size.height;

    return Stack(
      children: [
        // 内容
        GestureDetector(
          onHorizontalDragStart: _start,
          onHorizontalDragUpdate: _move,
          onHorizontalDragEnd: _end,
          onVerticalDragStart: _start,
          onVerticalDragUpdate: _move,
          onVerticalDragEnd: _end,
          child: Container(
            width: double.infinity,
            height: double.infinity,
            color: this.widget.bgColor,
            child: ListView(
              controller: _controller,
              scrollDirection: _sp=='x'?Axis.horizontal:Axis.vertical,
              padding: EdgeInsets.only(top:0.0),
              children: this.widget.slotHtml,
            ),
          ),
        ),
        // 左、上
        if(this.widget.upperLoad) _getUpper(),
      ],
    );
  }

  /* 返回 */
  Map<String,double> _res(){
    return {
      'x': _body['x'],
      'y': _body['y'],
      'w': _body['w'],
      'h': _body['h'],
      'boxW': _html['w'],
      'boxH': _html['h'],
    };
  }

  /* 开始 */
  void _start(DragStartDetails e){
    _movePage = {'x':0.0,'y':0.0};
    _startPage = {'x': e.globalPosition.dx,'y': e.globalPosition.dy};
  }
  /* 移动 */
  void _move(DragUpdateDetails e){
    _movePage = {
      'x': e.globalPosition.dx-_startPage['x'],
      'y': e.globalPosition.dy-_startPage['y'],
    };
  }
  /* 结束 */
  void _end(DragEndDetails e){
    // 滑动方向
    final ratio = (_movePage['x']/_movePage['y']).abs();
    if(ratio>1 && _movePage['x']>this.widget.limit)this.widget.swipe('left');
    else if(ratio>1 && _movePage['x']<-this.widget.limit)this.widget.swipe('right');
    else if(ratio<1 && _movePage['y']>this.widget.limit)this.widget.swipe('down');
    else if(ratio<1 && _movePage['y']<-this.widget.limit)this.widget.swipe('up');
  }

  /* 滑动事件 */
  void _scroll(){
    _pos = _controller.position;
    _body[_sp] = _controller.offset;
    // 宽高
    _body['w'] = _sp=='x'?_pos.maxScrollExtent:_html['w'];
    _body['h'] = _sp=='y'?_pos.maxScrollExtent:_html['h'];
    // 滑动范围
    _body['min'] = 0.0;
    _body['max'] = _body[_sp=='x'?'w':'h']-this.widget.lowerBoundary;
    // 事件-滑动
    if(this.widget.scroll!=null) this.widget.scroll(_res());
    // 事件-下拉、上拉
    if(_body[_sp]<=0){
      // 控制上限
      double _x = _body[_sp];
      if(-_x>=this.widget.upper){
        _x = -this.widget.upper;
        // 事件-刷新
        if(_isUpper){
          _isUpper = false;
          if(_sp=='x' && this.widget.left!=null) this.widget.left(_res());
          else if(this.widget.down!=null) this.widget.down(_res());
          setTimeout((){ _isUpper=true; },3000);
        }
      }
      // Loading
      setState((){ _upper = -(this.widget.upper+_x); });
    }else if(_body[_sp]>=_body['max'] && _isLower){
      _isLower = false;
      if(_sp=='x' && this.widget.right!=null) this.widget.right(_res());
      else if(this.widget.up!=null) this.widget.up(_res());
      setTimeout((){ _isLower=true; },3000);
    }
  }

  /* 加载-左、上 */
  Widget _getUpper(){
    Widget _html;
    if(_sp=='x'){
      _html = Positioned(
        top: 0, bottom: 0,
        left: _upper,
        child: _getLoading(),
      );
    }else{
      _html = Positioned(
        left: 0, right: 0,
        top: _upper,
        child: _getLoading(),
      );
    }
    return _html;
  }

  /* Loading */
  Widget _getLoading(){
    return Container(
      height: this.widget.upper,
      color: this.widget.upperBg!=''?uiColor(this.widget.upperBg):null,
      child: Center(
        child: this.widget.upperLoad?Loading(icon: this.widget.upperIcon, color: this.widget.upperColor==''?Env.color['primary']:this.widget.upperColor,):null,
      ),
    );
  }

}