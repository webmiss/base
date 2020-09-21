import 'package:flutter/material.dart';
import 'package:webmis/env.dart';
import 'package:amap_core_fluttify/amap_core_fluttify.dart';
import 'package:amap_location_fluttify/amap_location_fluttify.dart';
import 'package:webmis/library/plus/permission.dart';

/* 高德定位 */
class MapGeolocation {

  /* 获取权限 */
  static Future<bool> perm(BuildContext context) async {
    await AmapCore.init(Env.amap['iOS_KEY']);
    bool perm = await Perm.request(context, 'location');
    return perm;
  }

  /* 单次 */
  static Future<Map> fetch(BuildContext context) async {
    Map<String,dynamic> res;
    // 权限
    bool perm = await MapGeolocation.perm(context);
    // 定位
    if(perm){
      final location = await AmapLocation.instance.fetchLocation();
      res = {
        'longitude': location.latLng.longitude,
        'latitude': location.latLng.latitude,
        'province': location.province,
        'city': location.city,
        'district': location.district,
        'street': location.street,
        'streetnum': location.streetNumber,
        'poiname': location.poiName,
        'address': location.poiName+location.streetNumber,
      };
    }
    return res;
  }

  /* 连续 */
  static Future<dynamic> listen(BuildContext context) async {
    Map<String,dynamic> res;
    // 权限
    bool perm = await MapGeolocation.perm(context);
    // 定位
    if(perm){
      await for (final location in AmapLocation.instance.listenLocation()) {
        res = {
          'longitude': location.latLng.longitude,
          'latitude': location.latLng.latitude,
          'province': location.province,
          'city': location.city,
          'district': location.district,
          'street': location.street,
          'streetnum': location.streetNumber,
          'poiname': location.poiName,
          'address': location.poiName+location.streetNumber,
        };
        return res;
      }
    }
  }

  /* 停止 */
  static Future<void> stop() async {
    await AmapLocation.instance.dispose();
    return await AmapLocation.instance.stopLocation();
  }

  /* 销毁 */
  static Future<void> dispose() async {
    return await AmapLocation.instance.dispose();
  }

}