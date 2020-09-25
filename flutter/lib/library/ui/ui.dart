import 'package:flutter/material.dart';
import 'package:webmis/env.dart';
import 'package:webmis/store.dart';
import 'package:provider/provider.dart';
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
        child: Icon(uiIcons.back,size: 16,color:uiColor(color),),
      ),
      onTap: ()=> NavigatorTo.pop(context,parm:parm),
    );
  }

  /* 全局状态 */
  static Store store(BuildContext context){
    return Provider.of<Store>(context,listen: false);
  }

  /* 标题 */
  static Widget title(text){
    return Center(
      child: Ui.text(text,fontSize:16),
    );
  }

  /* 文本-隐藏 */
  static Widget nowrap(text,{
    double fontSize: 14,
    double height: 1.0,
    String color: '#222222',
    FontWeight fontWeight: FontWeight.normal,
    int maxLines: 1,
    TextOverflow overflow: TextOverflow.ellipsis,
  }){
    return Ui.text(
      text,
      fontSize: fontSize,
      height: height,
      color: color,
      fontWeight: fontWeight,
      maxLines: maxLines,
      overflow: overflow,
    );
  }

  /* 文本 */
  static Widget text(text,{
    double fontSize: 14,
    double height: 1.5,
    String color: '#222222',
    FontWeight fontWeight: FontWeight.normal,
    TextDecoration decoration: TextDecoration.none,
    int maxLines,
    TextOverflow overflow,
  }){
    return Text(
      text,
      maxLines: maxLines,
      softWrap: true,
      overflow: overflow,
      style: TextStyle(
        fontSize: fontSize,
        color: uiColor(color),
        fontWeight: fontWeight,
        height: height,
        decoration: decoration
      ),
    );
  }

  /* 按钮 */
  static Widget button(text,{
    double width: double.infinity,
    double height: 50.0,
    double borderRadius: 8.0,
    String borderColor: '#F2F2F2',
    String bgColor: '#FFFFFF',
    String textColor: '',
    Function click,
  }){
    return Material(
      child: Ink(
        decoration: BoxDecoration(
          color: uiColor(bgColor),
          borderRadius: BorderRadius.all(Radius.circular(borderRadius)),
          border: Border.all(width: 1, color: uiColor(borderColor)),
        ),
        child: InkResponse(
          radius: 200.0,
          splashColor: uiColor(Env.color['primary']),
          containedInkWell: true,
          highlightShape: BoxShape.rectangle,
          child: Container(
            width: width,
            height: height,
            alignment: Alignment(0, 0),
            padding: EdgeInsets.all(8),
            child: Ui.nowrap(text,color: textColor!=''?textColor:Env.color['primary']),
          ),
          onTap: ()=>click(),
        ),
      ),
    );
  }

}