import 'package:flutter/material.dart';
import 'package:webmis/library/inc/time-set.dart';

/* 弹出层 */
class Popup {
  static OverlayEntry _overlayEntry;
  static String _position;
  static Widget _slotBody;
  static double _opacity;
  static bool _bgClose;
  static bool _show = false;
  Popup(
    BuildContext context,
    {
      Widget slotBody,
      String position: '',
      double opacity: 0.7,
      bool bgClose: true,
      String bgColor: '',
      Function controller,
    }
  ){
    /* 参数 */
    _slotBody = slotBody;
    _position = position;
    _opacity = opacity;
    _bgClose = bgClose;
    controller(this);
    /* 状态 */
    OverlayState overlayState = Overlay.of(context);
    /* 内容 */
    if(_overlayEntry==null){
      _overlayEntry = OverlayEntry(builder: (BuildContext context)=>_getBox(context) );
      // 插入
      overlayState.insert(_overlayEntry);
    }else{
      // 刷新UI
      _overlayEntry.markNeedsBuild();
    }
    // 背景淡入
    setTimeout((){
      _show = true;
      _overlayEntry.markNeedsBuild();
    },100);
  }

  /* 关闭 */
  void close()=> _closeBg();
  /* 点击背景 */
  void _closeBg(){
    _show = false;
    _overlayEntry.markNeedsBuild();
    setTimeout((){
      _overlayEntry.remove();
      _overlayEntry = null;
    },400);
  }

  /* 容器 */
  Widget _getBox(context){
    return Stack(
      children: [
        // 背景
        GestureDetector(
          onTap: ()=> _bgClose?_closeBg():null,
          child: AnimatedContainer(
            width: double.infinity,
            height: double.infinity,
            color: Color.fromRGBO(0,0,0,_show?_opacity:0.0),
            duration: Duration(milliseconds: _show?400:200),
          ),
        ),
        // 内容
        _getPopup(context),
      ],
    );
  }

  /* 内容 */
  Widget _getPopup(context){
    if(_position=='left'){
      /* 左侧 */
      return AnimatedPositioned(
        top: 0,
        bottom: 0,
        left: _show?0:-MediaQuery.of(context).size.width,
        duration: Duration(milliseconds: _show?400:200),
        child: AnimatedOpacity(
          opacity: _show?1.0:0.0,
          duration: Duration(milliseconds: _show?400:200),
          child: _slotBody,
        ),
      );
    }else if(_position=='right'){
      /* 右侧 */
      return AnimatedPositioned(
        top: 0,
        bottom: 0,
        right: _show?0:-MediaQuery.of(context).size.width,
        duration: Duration(milliseconds: _show?400:200),
        child: AnimatedOpacity(
          opacity: _show?1.0:0.0,
          duration: Duration(milliseconds: _show?400:200),
          child: _slotBody,
        ),
      );
    }else if(_position=='top'){
      /* 顶部 */
      return AnimatedPositioned(
        left: 0,
        right: 0,
        top: _show?0:-MediaQuery.of(context).size.height,
        duration: Duration(milliseconds: _show?400:200),
        child: AnimatedOpacity(
          opacity: _show?1.0:0.0,
          duration: Duration(milliseconds: _show?400:200),
          child: _slotBody,
        ),
      );
    }else if(_position=='bottom'){
      /* 底部 */
      return AnimatedPositioned(
        left: 0,
        right: 0,
        bottom: _show?0:-MediaQuery.of(context).size.height,
        duration: Duration(milliseconds: _show?400:200),
        child: AnimatedOpacity(
          opacity: _show?1.0:0.0,
          duration: Duration(milliseconds: _show?400:200),
          child: _slotBody,
        ),
      );
    }else{
      /* 中部 */
      return Center(
        child:  AnimatedOpacity(
          opacity: _show?1.0:0.0,
          duration: Duration(milliseconds: _show?200:200),
          child: AnimatedContainer(
            alignment: Alignment.center,
            transform: Matrix4.identity()..translate(0.0,_show?0.0:-100.0),
            duration: Duration(milliseconds: _show?200:200),
            child: _slotBody,
          ),
        ),
      );
    }
    
  }

}