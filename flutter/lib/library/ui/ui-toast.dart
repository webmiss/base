import 'package:flutter/material.dart';
import 'package:webmis/library/ui/ui.dart';

/* UI-提示 */
class Toast {
  static OverlayEntry _overlayEntry;
  static String _msg;
  static BuildContext _context;
  static bool _show = false;
  static double _top = 0.0;

  Toast(
    BuildContext context,
    String msg,
    { int time: 2000 }
  ){

    // 参数
    assert(msg != null);
    _msg = msg;
    _context = context;
    // 内容
    _overlayEntry = OverlayEntry(builder: (BuildContext context)=>_getBox() );
    // 显示
    _show = true;
    _top = MediaQuery.of(_context).size.height*1/10;
    Overlay.of(context).insert(_overlayEntry);
    // 清除
    Future.delayed(Duration(milliseconds: time)).then((value) {
      _overlayEntry.remove();
    });
    
  }

  /* 容器-动画 */
  Widget _getBox(){
    return AnimatedPositioned(
      top: _top,
      duration: Duration(milliseconds: _show?400:200),
      child: AnimatedOpacity(
        opacity: _show?1.0:0.0,
        duration: Duration(milliseconds: _show?400:3000),
        child: Container(
          alignment: Alignment.center,
          width: MediaQuery.of(_context).size.width,
          child: _getToast(),
        ),
      ),
    );
  }

  /* 内容 */
  Widget _getToast(){
    return Center(
      child: Card(
        color: Color.fromRGBO(0,0,0,0.5),
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 24.0, vertical: 8.0),
          child: Ui.text(_msg,fontSize: 14, color: '#FFFFFF'),
        ),
      ),
    );
  }

}