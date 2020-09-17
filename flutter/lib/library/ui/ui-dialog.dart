import 'package:flutter/material.dart';
import 'package:webmis/library/ui/ui.dart';
import 'package:webmis/components/popup.dart';

// ignore: camel_case_types
class uiDialog {

  /* 弹窗 */
  static void alert(BuildContext context, {
    String title: '',
    String message: '内容',
    double width: 320.0,
    String confirmText: '确定',
    Function confirm,
  }){
    return _show( 'alert', context, title: title, message: message, width: width, confirmText: confirmText, confirm: confirm );
  }

  /* 弹窗 */
  static void confirm(BuildContext context, {
    String title: '',
    String message: '内容',
    double width: 320.0,
    String confirmText: '确定',
    String cancelText: '取消',
    Function confirm,
    Function cancel,
  }){
    return _show( 'confirm', context, title: title, message: message, width: width, confirmText: confirmText, cancelText: cancelText, confirm: confirm, cancel: cancel );
  }

  /* 显示 */
  static void _show(String type, BuildContext context, {
    String title: '',
    String message: '',
    double width: 320.0,
    String confirmText: '确定',
    String cancelText: '取消',
    Function confirm,
    Function cancel,
  }){
    var _popController;
    List<Widget> button = [];
    // 类型    
    if(type=='alert'){
      button = [
        Positioned( width: width, right: 0, top: 0, bottom: 0,
          child: Ui.button(confirmText, borderRadius: 0, click: ()=>confirm(_popController)),
        ),
      ];
    }else if(type=='confirm'){
      button = [
        Positioned( width: width/2, left: 0, top: 0, bottom: 0,
          child: Ui.button(cancelText, borderRadius: 0, textColor: '#666666', click: ()=>cancel(_popController)),
        ),
        Positioned( width: width/2, right: 0, top: 0, bottom: 0,
          child: Ui.button(confirmText, borderRadius: 0, click: ()=>confirm(_popController)),
        ),
      ];
    }
    // 窗口
    Popup(
      context,
      bgClose: false,
      controller: (obj)=> _popController=obj,
      slotBody: ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: Container(
          width: width,
          color: Colors.white,
          child: Stack(
            children: [
              // 内容
              Container(
                padding: EdgeInsets.only(left:20,right:20,top:title!=''?50:20,bottom:80),
                child: Ui.text(message),
              ),
              // 标题
              if(title!='') Positioned(
                left: 0,
                right: 0,
                top: 0,
                child: Container(
                  height: 50,
                  child: Ui.title(title),
                ),
              ),
              // 按钮
              Positioned(
                left: 0,
                right: 0,
                bottom: 0,
                child: Container(
                  height: 50,
                  child: Stack(
                    children: button,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }


}