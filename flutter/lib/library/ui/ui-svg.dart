import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

/* Svg图片加载 */
Widget uiSvg({String src, Widget color}) {
  return SvgPicture.asset(src);
}