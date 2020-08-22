import 'package:flutter/material.dart';

/* 十六进制颜色值 */
Color uiColor(String color) {
  if (color==null || color.length!=7 || int.tryParse(color.substring(1,7),radix:16)==null) color='#999999';
  return new Color(int.parse(color.substring(1, 7),radix:16)+0xFF000000);
}