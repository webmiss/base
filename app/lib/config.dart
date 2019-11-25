import 'dart:async';
import 'dart:convert' as convert;
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:web_socket_channel/io.dart';
import 'package:web_socket_channel/status.dart' as status;

// 配置文件
import 'env.dart';

/* 公共类 */
class Inc {

  // 配置
  static final String baseUrl = config['baseUrl'];
  static final String apiUrl = config['baseUrl']+config['apiUrl'];
  static final String name = config['name'];
  static final String copy = config['copy'];
  static final String themeColor = config['themeColor'];
  static final bool update = false;
  static final Map<String,String> upDateColor = config['upDateColor'];
  static final String upIosUrl = config['upIosUrl'];
  // Socket
  static var socket;

  /* 初始化 */
  static Future init() async {
    print('Global');
    // Socket
    String _token = '1fBB/6k3i8cV83M+ld2RFtCZSDmYP9vggwyPhOLHvTKmNxsm1Dz6c0jhYDzwGML9nMozHpim8bTbygAc5S93tS5Q82n8QkLfZ8ZeL/wDpeRzLi8w';
    socket = await IOWebSocketChannel.connect(config['socketServer']+'?token='+_token);
    print(socket);
    socket.sink.add('{"type":"newMsg"}');
    print('Send');
    socket.stream.listen((message) {
      socket.sink.add('{"type":"newMsg"}');
      // socket.sink.close(status.goingAway);
      print(message);
    });
  }
  
  /* 十六进制颜色值 */
  static Color getColor(String s) {
    if (s == null || s.length != 7 || int.tryParse(s.substring(1, 7), radix: 16) == null) s='#999999';
    return new Color(int.parse(s.substring(1, 7), radix: 16) + 0xFF000000);
  }

  /* Get请求 */
  static Future get(String url, [Map<String, dynamic> params]) async {
    String _param = '';
    params.forEach((k,v) => _param += k+'='+v+'&');
    url = _param!=''?url+'?'+_param:url;
    // 请求
    var response = await http.get(url+_param);
    if (response.statusCode == 200) {
      return convert.jsonDecode(response.body);
    }else{
      return response.statusCode;
    }
  }

  /* Post请求 */
  static Future post(String url, Map<String, dynamic> params) async {
    var response = await http.post(url, body: params);
    if (response.statusCode == 200) {
      return convert.jsonDecode(response.body);
    }else{
      return response.statusCode;
    }
  }
  
}

