import 'package:flutter/material.dart';
import 'package:webmis/env.dart';
import 'package:web_socket_channel/io.dart';
import 'package:web_socket_channel/status.dart' as status;

/* Socket客户端 */
class Socket{

  static BuildContext _context;

  /* 启动 */
  static void start(BuildContext context){
    _context = context;
  }

}