import 'dart:convert' as convert;
import 'package:webmis/env.dart';
import 'package:dio/dio.dart';

/* 配置 */
Response response;
Dio _dio = new Dio(BaseOptions(
  connectTimeout: 5000,
  receiveTimeout: 3000,
  contentType: Env.request['content-type'],
));

/* Get请求 */
Future get(String url, [Map<String, dynamic> params]) async {
  String str = url.substring(0,4);
  url = str=='http'?url:Env.apiUrl+url;
  // 请求
  try {
    response = await _dio.get(url,queryParameters:params);
    return response.data.runtimeType==String&&response.data!=''?convert.jsonDecode(response.data):response.data;
  } on DioError catch(e) {
    RegExp host = RegExp(r'(localhost|127.0.0.1)');
    String msg = host.firstMatch(url)==null?e.message:'请使用IP或外网地址';
    return {'type':_formatDioError(e),'url':url,'msg':msg};
  } finally {
    _dio.close();
  }
}

/* Post请求 */
Future post(String url, Map<String, dynamic> params) async {
  String str = url.substring(0,4);
  url = str=='http'?url:Env.apiUrl+url;
  // 请求
  try {
    response = await _dio.post(url,data:params);
    return response.data.runtimeType==String&&response.data!=''?convert.jsonDecode(response.data):response.data;
  } on DioError catch(e) {
    RegExp host = RegExp(r'(localhost|127.0.0.1)');
    String msg = host.firstMatch(url)==null?e.message:'请使用IP或外网地址';
    return {'type':_formatDioError(e),'url':url,'msg':msg};
  } finally {
    _dio.close();
  }
}

/* 请求错误 */
String _formatDioError(DioError e){
  String msg;
  switch(e.type){
    case DioErrorType.CONNECT_TIMEOUT:
      msg = '连接超时';
      break;
    case DioErrorType.SEND_TIMEOUT:
      msg = '请求超时';
      break;
    case DioErrorType.RECEIVE_TIMEOUT:
      msg = '响应超时';
      break;
    case DioErrorType.RESPONSE:
      msg = '出现异常';
      break;
    case DioErrorType.CANCEL:
      msg = '请求取消';
      break;
    default:
      msg = '未知错误';
      break;
  }
  return msg;
}