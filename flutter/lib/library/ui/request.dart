import 'dart:convert' as convert;
import 'package:http/http.dart' as http;

/* Get请求 */
Future get(String url, [Map<String, dynamic> params]) async {
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
Future post(String url, Map<String, dynamic> params) async {
  var response = await http.post(url, body: params);
  if (response.statusCode == 200) {
    return convert.jsonDecode(response.body);
  }else{
    return response.statusCode;
  }
}