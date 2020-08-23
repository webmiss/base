import 'package:flutter/material.dart';

/* 十六进制颜色值 */
// ignore: camel_case_types
class uiColor extends Color {
  
  // 参数
  uiColor(final String hexColor) : super(_getColorFromHex(hexColor));

  // 转换
  static int _getColorFromHex(String hexColor) {
    hexColor = hexColor.toUpperCase().replaceAll("#", "");
    if (hexColor.length == 6) {
      hexColor = "FF" + hexColor;
    }
    return int.parse(hexColor, radix: 16);
  }
  
}