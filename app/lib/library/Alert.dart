
import 'package:flutter/material.dart';
import 'package:flutter_alert/flutter_alert.dart';

void alert({
  @required BuildContext context,
  String title,
  String body,
  List actions,
  bool barrierDismissible = true,
  bool cancelable = false,
}){
  // 默认按钮
  if(actions==null){
    actions = <AlertAction>[AlertAction(text: '确定',onPressed:(){})];
  }else{
    List<AlertAction> _list = List.generate(actions.length, (index) {
      return AlertAction(text: actions[index][0],onPressed: actions[index][1]);
    });
    actions = _list;
  }
  // 插件
  showAlert(context: context, title: title, body: body, actions: actions, barrierDismissible: barrierDismissible, cancelable: cancelable);
}