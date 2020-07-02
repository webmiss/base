import 'package:webmis/config.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

 /* Loading */
Widget loading({
  String theme: 'ThreeBounce',
  Color color: Colors.grey,
  String background: '#F2F2F2',
  double size: 30.0
}){
  // 主题
  Widget _theme;
  if(theme=='ThreeBounce') _theme = SpinKitThreeBounce(color: color, size: size);
  else if(theme=='RotatingPlane') _theme = SpinKitRotatingPlain(color: color, size: size);
  else if(theme=='DoubleBounce') _theme = SpinKitDoubleBounce(color: color, size: size);
  else if(theme=='Wave') _theme = SpinKitWave(color: color, size: size);
  else if(theme=='WanderingCubes') _theme = SpinKitWanderingCubes(color: color, size: size);
  else if(theme=='FadingFour') _theme = SpinKitFadingFour(color: color, size: size);
  else if(theme=='FadingCube') _theme = SpinKitFadingCube(color: color, size: size);
  else if(theme=='Pulse') _theme = SpinKitPulse(color: color, size: size);
  else if(theme=='ChasingDots') _theme = SpinKitChasingDots(color: color, size: size);
  else if(theme=='Circle') _theme = SpinKitCircle(color: color, size: size);
  else if(theme=='CubeGrid') _theme = SpinKitCubeGrid(color: color, size: size);
  else if(theme=='FadingCircle') _theme = SpinKitFadingCircle(color: color, size: size);
  else if(theme=='RotatingCircle') _theme = SpinKitRotatingCircle(color: color, size: size);
  else if(theme=='FoldingCube') _theme = SpinKitFoldingCube(color: color, size: size);
  else if(theme=='PumpingHeart') _theme = SpinKitPumpingHeart(color: color, size: size);
  else if(theme=='DualRing') _theme = SpinKitDualRing(color: color, size: size);
  else if(theme=='HourGlass') _theme = SpinKitHourGlass(color: color, size: size);
  else if(theme=='PouringHourGlass') _theme = SpinKitPouringHourglass(color: color, size: size);
  else if(theme=='FadingGrid') _theme = SpinKitFadingGrid(color: color, size: size);
  else if(theme=='Ring') _theme = SpinKitRing(color: color, size: size);
  else if(theme=='Ripple') _theme = SpinKitRipple(color: color, size: size);
  else if(theme=='SpinningCircle') _theme = SpinKitSpinningCircle(color: color, size: size);
  // 内容
  return Container(
    color: Inc.getColor(background),
    child: Center(child: _theme),
  );
}