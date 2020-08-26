import 'package:flutter/material.dart';

/* UI-跳转页面 */
class NavigatorTo{

  /* 跳转 */
  static void push(context,{page}){
    // Navigator.push(context, MaterialPageRoute(builder: (context){return page;}));
    Navigator.push(context, CustomRouteSlide(page));
  }
  
  /* 返回 */
  static void pop(context,{parm}){
    Navigator.pop(context,parm);
  }

}

/* 左右滑动 */
class CustomRouteSlide extends PageRouteBuilder{
  final Widget widget;
  CustomRouteSlide(this.widget) :super(
    transitionDuration: const Duration(milliseconds:400),
    pageBuilder:(
      BuildContext context,
      Animation<double> animation1,
      Animation<double> animation2
    ){
      return widget;
    },
    transitionsBuilder:(
      BuildContext context,
      Animation<double> animation1,
      Animation<double> animation2,
      Widget child,
    ){

      return SlideTransition(
        position: Tween<Offset>(
          begin: Offset(1.0, 0.0),
          end: Offset(0.0, 0.0)
        ).animate(
          CurvedAnimation(
            parent: animation1,
            curve: Curves.fastOutSlowIn
          )
        ),
        child: child,
      );

    } 
  ); 
}