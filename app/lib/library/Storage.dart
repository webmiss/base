import 'package:shared_preferences/shared_preferences.dart';

/* 本地硬盘 */
class Storage{
  /* 存储-保存 */
  static Future<Null> setItem(String key, value) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    if(value.runtimeType==String){
      prefs.setString(key, value);
    }else if(value.runtimeType==int){
      prefs.setInt(key, value);
    }else if(value.runtimeType==double){
      prefs.setDouble(key, value);
    }else if(value.runtimeType==bool){
      prefs.setBool(key, value);
    }
  }
  /* 存储-获取 */
  static getItem(String key) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.get(key);
  }
  /* 存储-删除 */
  static removeItem(String key) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove(key);
  }
  /* 存储-清除 */
  static clearItem() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.clear();
  }
}