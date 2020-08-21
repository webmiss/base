import 'package:flutter/material.dart';

/* 十六进制颜色值 */
Color uiColor(String s) {
  if (s == null || s.length != 7 || int.tryParse(s.substring(1, 7), radix: 16) == null) s='#999999';
  return new Color(int.parse(s.substring(1, 7), radix: 16) + 0xFF000000);
}