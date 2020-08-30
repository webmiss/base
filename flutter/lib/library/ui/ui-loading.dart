import 'package:flutter/material.dart';
import 'package:webmis/env.dart';
import 'package:webmis/library/ui/ui-icons.dart';
import 'package:webmis/library/ui/ui-color.dart';

class Loading extends StatefulWidget {

  // 参数
  final IconData icon;
  final String color;
  const Loading({
    Key key,
    this.icon: uiIcons.loading,
    this.color: '',
  }): super(key: key);

  @override
  State<StatefulWidget> createState() => LoadingState();
}
class LoadingState extends State<Loading> with SingleTickerProviderStateMixin {

  AnimationController _controller;

  /* 构造函数 */
  @override
  void initState() {
    super.initState();
    // 动画控制器
    _controller = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 1600),
    );
    _controller.forward();
  }

  /* Widget */
  @override
  Widget build(BuildContext context) {
    /* 显示 */
    return RotationTransition(
      child: CircleAvatar(
        radius: 20,
        backgroundColor: Color.fromRGBO(0,0,0,0),
        foregroundColor: uiColor(this.widget.color==''?Env.color['primary']:this.widget.color),
        child: Icon(this.widget.icon),
      ),
      turns: _controller..addStatusListener((status){
        if(status==AnimationStatus.completed){
          _controller.reset();
          _controller.forward();
        }
      }),
    );
  }
   
}