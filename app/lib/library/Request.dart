import 'package:dio/dio.dart';
import 'package:path/path.dart' as path;

/* 文件类 */
class Request{

  /* 配置 */
  static final _dio = new Dio(BaseOptions(
    connectTimeout: 5000,
    receiveTimeout: 3000,
    headers: {
    'accept-language': 'zh-cn',
    // 'content-type': 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
    }
  ));

  /* 文件-上传 */
  static Future upFile(String url, String filePath, [Object progress]) async {
    String name = path.basename(filePath);
    progress = progress!=null?progress:(){};
    FormData formData = new FormData.fromMap({
      'up': await MultipartFile.fromFile(filePath, filename: name),
    });
    try {
      return await _dio.post(url, data: formData, onReceiveProgress: progress);
    } on DioError catch (e) {
      return formatDioError(e);
    }
  }

  /* 文件-下载 */
  static Future downFile(String url, String file, Object progress) async {
    try {
      return await _dio.download(url, file,onReceiveProgress: progress);
    } on DioError catch (e) {
      return formatDioError(e);
    }
  }

  /* 请求错误 */
  static String formatDioError(DioError e) {
    if (e.type == DioErrorType.CONNECT_TIMEOUT) {
      return '连接超时';
    } else if (e.type == DioErrorType.SEND_TIMEOUT) {
      return '请求超时';
    } else if (e.type == DioErrorType.RECEIVE_TIMEOUT) {
      return '响应超时';
    } else if (e.type == DioErrorType.RESPONSE) {
      return '出现异常';
    } else if (e.type == DioErrorType.CANCEL) {
      return '请求取消';
    } else {
      return '未知错误';
    }
  }

}