import 'package:flutter/material.dart';

/* UI-跳转页面 */
class NavigatorTo{

  /* 跳转 */
  static void push(context,{page,then}){
    if(then.runtimeType == Null) Navigator.push(context, MaterialPageRoute(builder: (context){return page;}));
    else Navigator.push(context, MaterialPageRoute(builder: (context){return page;})).then(then);
  }
  
  /* 返回 */
  static void pop(context,{parm}){
    Navigator.pop(context,parm);
  }

}