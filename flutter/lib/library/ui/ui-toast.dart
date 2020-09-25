import 'package:flutter/material.dart';
import 'package:webmis/library/ui/ui.dart';

/* UI-提示 */
class Toast {
  static bool _show = false;
  static double _top = 0.0;
  Toast(
    BuildContext context,
    String msg,
    { int time: 2000 }
  ){

    // 参数
    assert(msg != null);
    // 内容
    OverlayEntry _overlayEntry = OverlayEntry(builder: (BuildContext context)=>_getBox(context,msg) );
    // 显示
    _show = true;
    Overlay.of(context).insert(_overlayEntry);
    // 清除
    Future.delayed(Duration(milliseconds: time)).then((res) {
      _overlayEntry.remove();
    });
    
  }

  /* 内容 */
  Widget _getBox(BuildContext context, String msg){
    // 距离顶部
    _top = MediaQuery.of(context).size.height*1/10;
    return AnimatedPositioned(
      top: _top,
      duration: Duration(milliseconds: _show?400:200),
      child: AnimatedOpacity(
        opacity: _show?1.0:0.0,
        duration: Duration(milliseconds: _show?400:3000),
        child: Container(
          alignment: Alignment.center,
          width: MediaQuery.of(context).size.width,
          child: Center(
            child: Card(
              color: Color.fromRGBO(0,0,0,0.5),
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 24.0, vertical: 8.0),
                child: Ui.text(msg,fontSize: 14, color: '#FFFFFF'),
              ),
            ),
          ),
        ),
      ),
    );
  }

}