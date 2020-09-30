import 'dart:convert' as convert;
import 'package:webmis/env.dart';
import 'package:webmis/library/ui/request.dart';
import 'package:flutter_alipay/flutter_alipay.dart';
import 'package:fluwx/fluwx.dart' as fluwx;

/* 支付类 */
class Pay{

  /* 微信支付 */
  static Future wxapy(String url, Map<String,dynamic> data) async {
    // 配置
    await fluwx.registerWxApi(
      appId: Env.pay['wx_appId'],
      doOnAndroid: true,
      doOnIOS: true,
      universalLink: Env.pay['universalLink'],
    );
    // 检测
    var isPay = await fluwx.isWeChatInstalled;
    if(isPay==false) throw '没有安装微信!';
    // 请求
    data['type']='APP';
    Map res = await post(url, data);
    if(res['code']!=0) throw res['code'];
    // 支付
    await fluwx.payWithWeChat(
      appId: res['data']['appid'],
      partnerId: res['data']['partnerid'],
      prepayId: res['data']['prepayid'],
      packageValue: res['data']['package'],
      nonceStr: res['data']['noncestr'],
      timeStamp: int.parse(res['data']['timestamp']),
      sign: res['data']['sign'],
    );
    // 回调
    fluwx.weChatResponseEventHandler.listen((res) {
      if (res is fluwx.WeChatPaymentResponse) {
        return res;
      }
    });
  }

  /* 支付宝 */
  static Future alipay(String url, Map<String,dynamic> data) async {
    // 配置
    await FlutterAlipay.setIosUrlSchema(Env.pay['universalLink']);
    // 检测
    // var isPay = await FlutterAlipay.isInstalled();
    // if(isPay==false) throw '没有安装支付宝!';
    // 请求
    data['type']='app';
    Map res = await post(url, data);
    if(res['code']!=0) throw res['code'];
    // 支付
    AlipayResult pay = await FlutterAlipay.pay(res['data']);
    Map result = convert.jsonDecode(pay.result);
    return result[''];
  }

}