import 'package:webmis/env.dart';
import 'package:webmis/library/ui/request.dart';

/* 地图-地址 */
class MapAddress{

  static String _url = 'https://restapi.amap.com/v3/place/text';

  /* 搜索 */
  static Future search(String keywords,{
    String city: '昆明市',
    bool citylimit: true,
    int offset: 20,
    int page: 1,
  }) async {
    List<Map> list = [];
    Map<String,dynamic> params = {
      'key': Env.amap['WEB_KEY'],
      'keywords': keywords,
      'city': city,
      'citylimit': citylimit,
      'offset': offset,
      'page': page,
    };
    // 请求
    var res = await get(_url,params);
    for(var val in res['pois']){
      list.add({
        'location': val['location'].split(','),
        'province': val['pname'],
        'city': val['cityname'],
        'district': val['adname'],
        'name': val['name'],
        'address': val['address'],
      });
    }
    return list;
  }

}