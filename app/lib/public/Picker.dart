import 'package:flutter/material.dart';
import 'package:webmis/config.dart';
import 'package:flutter_picker/flutter_picker.dart';

void pickerShow({
  @required BuildContext context,
  List data,
}){
  Picker(
    adapter: PickerDataAdapter<String>(pickerdata: data),
    changeToFirst: true,
    textStyle: TextStyle(fontSize: 16, color: Inc.getColor('#333333')),
    selectedTextStyle: TextStyle(color: Inc.getColor(Inc.themeColor)),
    columnPadding: EdgeInsets.all(20.0),
    itemExtent: 36,
    confirmText: '确定',
    cancelText: '取消',
    confirmTextStyle: TextStyle(fontSize: 16),
    cancelTextStyle: TextStyle(fontSize: 16),
    onConfirm: (Picker picker, List value) {
      print(value.toString());
      print(picker.getSelectedValues());
    }
  ).showModal(context);
}