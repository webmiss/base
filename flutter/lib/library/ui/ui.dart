import 'package:flutter/material.dart';
import 'package:webmis/library/ui/ui-icons.dart';
import 'package:webmis/library/ui/ui-color.dart';
import 'package:webmis/library/ui/ui-navigator-to.dart';

/* 常规UI */
// ignore: camel_case_types
class Ui{

  /* 返回 */
  static Widget back(context,{
    String color: '#333333',
    Map<String,dynamic> parm,
  }){
    return GestureDetector(
      child: Container( width: 40,
        child: Icon(uiIcons.back,size: 18,color:uiColor(color),),
      ),
      onTap: ()=> NavigatorTo.pop(context,parm:parm),
    );
  }

  /* 标题 */
  static Widget title(String title,{
    double fontSize: 16,
    String color: '#333333',
  }){
    return Center(
      child: Text( title,
        style: TextStyle(fontSize: fontSize,color: uiColor(color)),
      ),
    );
  }

  /* 文字 */
  static Widget text(text,{
    double fontSize: 12,
    String color: '#333333',
  }){
    return Text( text,
      style: TextStyle(fontSize: fontSize,color: uiColor(color)),
    );
  }

}