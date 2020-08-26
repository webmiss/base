import 'package:flutter/material.dart';
import 'package:webmis/library/ui/ui.dart';
import 'package:webmis/library/ui/ui-color.dart';

import 'package:webmis/library/inc/time-set.dart';

/* UI-提示 */
class Toast {
  static OverlayEntry _overlayEntry;
  static String _msg;
  static BuildContext _context;
  static bool _show = false;
  static var _t = null;
  Toast(
    BuildContext context,
    String msg,
    {int time: 3000}
  ){

    /* 参数 */
    assert(msg != null);
    _msg = msg;
    _context = context;

    /* 状态 */
    OverlayState overlayState = Overlay.of(context);

    /* 内容 */
    if(_overlayEntry==null){
      _overlayEntry = OverlayEntry(builder: (BuildContext context)=>_getBox() );
      // 插入
      overlayState.insert(_overlayEntry);
    }else{
      // 刷新UI
      _overlayEntry.markNeedsBuild();
    }

    /* 显示 */
    setTimeout((){
      _show = true;
      _overlayEntry.markNeedsBuild();
    },100);

    /* 隐藏 */
    if(_t!=null) _t.cancel();
    _t = setTimeout((){
      _show = false;
      _overlayEntry.markNeedsBuild();
    },time);
    
  }

  /* 容器-动画 */
  Widget _getBox(){
    return AnimatedPositioned(
      top: _show?MediaQuery.of(_context).size.height*1/10:0.0,
      duration: Duration(milliseconds: _show?400:200),
      child: AnimatedOpacity(
        opacity: _show?1.0:0.0,
        duration: Duration(milliseconds: _show?400:200),
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
        color: Color.fromRGBO(0,0,0,0.8),
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 24.0, vertical: 8.0),
          child: Ui.text(_msg,fontSize: 14, color: '#FFFFFF'),
        ),
      ),
    );
  }

}