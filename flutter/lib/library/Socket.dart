import 'package:flutter/material.dart';
import 'dart:convert' as convert;
import 'package:webmis/env.dart';
import 'package:webmis/library/inc/time-set.dart';
import 'package:webmis/library/ui/ui.dart';
import 'package:webmis/library/ui/storage.dart';
import 'package:webmis/library/ui/ui-toast.dart';
import 'package:webmis/library/plus/notify.dart';
import 'package:web_socket_channel/io.dart';
// import 'package:web_socket_channel/status.dart' as status;

/* Socket客户端 */
class Socket{

  static BuildContext _context;
  static var _channel;
  static var _socketInterval;
  static var _heartbeat;
  static var _store;

  /* 消息路由 */
  static Future<void> msgRouter(Map<String,dynamic> d) async {
    if(d['type']=='group') msgGroup(d); //消息组
    else if(d['type']=='msg') msg(d); //消息
    else if(d['type']=='notify') msgNotify(d); //通知
  }

  /* 消息组 */
  static Future<void> msgGroup(Map<String,dynamic> d) async {
    print(d);
  }

  /* 消息 */
  static Future<void> msg(Map<String,dynamic> d) async {
    // 阅读
    final voice = await Storage.getItem('voice');
    Notify(_context,d['data']['title'],d['data']['content'],isRead: voice==true??false);
    print(d);
  }

  /* 通知 */
  static Future<void> msgNotify(Map<String,dynamic> d) async {
    print(d);
  }

  /* 启动 */
  static Future<void> start(BuildContext context) async {
    _context = context;
    // 3秒刷新1次
    if(_socketInterval!=null) _socketInterval.cancel();
    _socketInterval = setInterval((res){
      _store = Ui.store(_context);
      Storage.setItem('token','EsA_l6u445xsZ53rPzTxzjlvVNQP4WG0m6mzfRxvbMOpd0ZNTZT9iTz20_AcG_QTb6LSJMvcTer4w8p9oq8j9qGTlebbmHBA9Gvb_CA=');
      Ui.store(_context).setIsLogin(true);
      // print('login: ${_store.isLogin} socket: ${_store.socket}');
      // 验证
      if(_store.isLogin && ( _store.socket==null || _channel==null )){
        Storage.getItem('token').then((token){
          socket(token);
        });
      }
    },3000);
  }

  /* 链接 */
  static Future socket(String token) async {
    _channel = IOWebSocketChannel.connect(Env.socket['server']+'?token='+token);
    print('Socket开启');
    Ui.store(_context).setSocket(_channel);
    // 心跳包
    if(_heartbeat!=null) _heartbeat.cancel();
    _heartbeat = setInterval((res){
      _channel.sink.add(convert.jsonEncode({'type':''}));
    },10000);
    // 接收
    _channel.stream.listen((msg) {
      Map<String,dynamic> d = convert.jsonDecode(msg);
      // 是否成功
      if(d['code']!=0) return Toast(_context,d['msg']);
      // 消息路由
      msgRouter(d);
    });
  }

}