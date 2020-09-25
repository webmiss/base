import 'package:flutter/material.dart';

/* 全局状态 */
class Store extends ChangeNotifier{

  // 登录状态
  bool _isLogin = false;
  get isLogin => _isLogin;
  // 用户信息
  Map<String,dynamic> _uInfo = {};
  get uInfo => _uInfo;
  // 定位
  Map<String,dynamic> _geolocation = {};
  get geolocation => _geolocation;
  // Socket
  Object _socket;
  get socket => _socket;
  
  /* 登录状态 > 更新 */
  void setIsLogin(bool val){
    _isLogin = val;
    notifyListeners();
  }

  /* 用户信息 > 更新 */
  void setUInfo(Map<String,dynamic> uInfo){
    _uInfo = uInfo;
    notifyListeners();
  }

  /* 定位 > 更新 */
  void setGeolocation(Map<String,dynamic> location){
    _geolocation = location;
    notifyListeners();
  }

  /* Socket > 更新 */
  void setSocket(Object socket){
    _socket = socket;
    notifyListeners();
  }

}