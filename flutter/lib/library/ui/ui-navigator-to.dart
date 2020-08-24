import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

/* UI-跳转页面 */
class NavigatorTo{

  /* 跳转 */
  static void push(context,{page}){
    Navigator.push(context, CupertinoPageRoute(builder: (context){return page;}));
  }
  
  /* 返回 */
  static void pop(context,{parm}){
    Navigator.pop(context,parm);
  }

}