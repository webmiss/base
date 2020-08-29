import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

/* 字体图标 */
// ignore: camel_case_types
class uiIcons {
  /* UI */
  static const IconData back = IconData(0xe903, fontFamily: 'wmui');
  /* APP */
  static const IconData home = IconData(0xe900, fontFamily: 'icomoon');
  static const IconData me = IconData(0xe901, fontFamily: 'icomoon');
  static const IconData msg = IconData(0xe902, fontFamily: 'icomoon');
  /* SVG */
  static svg(String name,{String color: '#666666'}){
    // 图标
    final Map<String,dynamic> icons = {
      'logo': '<svg></svg>',
    };
    return SvgPicture.string(icons[name],allowDrawingOutsideViewBox: true,);
  }
}