import 'package:webmis/env.dart';
import 'package:toast/toast.dart';

/* Toast */
void toast({
  context,
  String type='info',
  String msg='提示信息',
  color='',
  background='',
  double radius=5.0
}){
  if(type=='info'){
    color = color==''?config['toast']['info']['color']:color;
    background = background==''?config['toast']['info']['background']:background;
    Toast.show(msg,context, backgroundRadius: radius, textColor: color, backgroundColor: background, gravity: Toast.CENTER);
  }else if(type=='success'){
    color = color==''?config['toast']['success']['color']:color;
    background = background==''?config['toast']['success']['background']:background;
    Toast.show(msg,context, backgroundRadius: radius, textColor: color, backgroundColor: background, gravity: Toast.CENTER);
  }else if(type=='error'){
    color = color==''?config['toast']['error']['color']:color;
    background = background==''?config['toast']['error']['background']:background;
    Toast.show(msg,context, backgroundRadius: radius, textColor: color, backgroundColor: background, gravity: Toast.CENTER);
  }
}