import 'dart:async';
import 'package:webmis/env.dart';
import 'package:web_socket_channel/io.dart';
// import 'package:web_socket_channel/status.dart' as status;

/* Socket客户端 */
class Socket{

  // 链接
  static var channel;

  /* 初始化 */
  static Future init(String token) async {
    // Socket
    token = '1fBB/6k3i8cV83M+ld2RFtCZSDmYP9vggwyPhOLHvTKmNxsm1Dz6c0jhYDzwGML9nMozHpim8bTbygAc5S93tS5Q82n8QkLfZ8ZeL/wDpeRzLi8w';
    channel = IOWebSocketChannel.connect(config['socketServer']+'?token='+token);
    // 心跳包
    Timer.periodic(Duration(seconds: 10), (t){
      channel.sink.add('{"type":""}');
    });
    // 监听消息
    // channel.stream.listen((message) {
    //   print(convert.jsonDecode(message));
    // });

  }

  /* Socket 发送 */
  static Future send(String msg) async {
    channel.sink.add('{"type":"newMsg"}');
  }

}