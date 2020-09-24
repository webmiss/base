import 'package:flutter/material.dart';
import 'package:webmis/store.dart';
import 'package:provider/provider.dart';
import 'package:webmis/library/ui/storage.dart';
import 'package:webmis/library/ui/request.dart';
import 'package:webmis/library/inc/time-set.dart';
import 'package:webmis/library/plus/map-geolocation.dart';

/* 启动 */
class Start{

  static BuildContext _context;
  static var _tokenInterval;

  /* 初始化 */
  static init(BuildContext context){
    _context = context;
    // 登录验证
    tokenState(1);
    if(_tokenInterval!=null) _tokenInterval.cancel();
    _tokenInterval = setInterval((res)=>tokenState(1),10000);
    /* 获取定位 */
    geoLocation();
  }

  /* 登录验证 */
  static Future<void> tokenState(int uinfo) async {
    final token = await Storage.getItem('token');
    Store store = Provider.of<Store>(_context,listen: false);
    if(token!=null && token!=''){
      Map res = await post('user/token', {'token': token, 'uinfo':uinfo.toString()});
      if(res['code']==0){
        store.setIsLogin(true);
        store.setUInfo(res['uinfo']);
      }else{
        store.setIsLogin(false);
        store.setUInfo({});
        await Storage.setItem('token','');
      }
    }else{
      store.setIsLogin(false);
      await Storage.setItem('token',null);
    }
  }

  /* 获取定位 */
  static Future<void> geoLocation() async {
    Store store = Provider.of<Store>(_context,listen: false);
    MapGeolocation.fetch(_context).then((res){
      store.setGeolocation(res);
      Storage.setItem('city',res['district']);
    }).catchError((e)=>print('定位失败！'));
  }

}