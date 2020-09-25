import 'package:flutter/material.dart';
import 'package:webmis/env.dart';
import 'package:webmis/library/ui/ui.dart';
import 'package:webmis/library/ui/storage.dart';
import 'package:webmis/library/ui/request.dart';
import 'package:webmis/library/inc/time-set.dart';
import 'package:webmis/library/plus/map-geolocation.dart';
import 'package:webmis/library/Socket.dart';

/* 启动 */
class Start{

  static BuildContext _context;
  static var _tokenInterval;

  /* 初始化 */
  static init(BuildContext context){
    _context = context;
    // 登录验证
    if(Env.login['start']){
      tokenState(1);
      if(_tokenInterval!=null) _tokenInterval.cancel();
      _tokenInterval = setInterval((res)=>tokenState(1),10000);
    }
    /* 获取定位 */
    if(Env.amap['start']) geoLocation();
    /* 消息推送 */
    if(Env.socket['start']) Socket.start(_context);
  }

  /* 登录验证 */
  static Future<void> tokenState(int uinfo) async {
    final token = await Storage.getItem('token');
    if(token!=null && token!=''){
      Map res = await post(Env.login['api'], {'token': token, 'uinfo':uinfo.toString()});
      if(res['code']==0){
        Ui.store(_context).setIsLogin(true);
        // 用户信息
        if(res[Env.login['uinfo']].runtimeType == Map){
          Ui.store(_context).setUInfo(res[Env.login['uinfo']]);
        }
      }else{
        Ui.store(_context).setIsLogin(false);
        Ui.store(_context).setUInfo({});
        await Storage.setItem('token','');
      }
    }else{
      Ui.store(_context).setIsLogin(false);
      await Storage.setItem('token',null);
    }
  }

  /* 获取定位 */
  static Future<void> geoLocation() async {
    MapGeolocation.fetch(_context).then((res){
      Ui.store(_context).setGeolocation(res);
      Storage.setItem('city',res['district']);
    }).catchError((e)=>print('定位失败！'));
  }

}