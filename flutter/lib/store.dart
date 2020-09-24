import 'package:flutter/material.dart';

/* 全局状态 */
class Store extends ChangeNotifier{
  // 登录状态
  bool _isLogin = false;
  get isLogin => _isLogin;
  
  /* 登录状态-更新 */
  void setIsLogin(bool val){
    _isLogin = val;
    notifyListeners();
  }

}