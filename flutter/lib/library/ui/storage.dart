import 'package:shared_preferences/shared_preferences.dart';

/* 本地硬盘 */
class Storage{
  /* 保存 */
  static Future setItem(String key, value) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    if(value.runtimeType==String){
      return prefs.setString(key, value);
    }else if(value.runtimeType==int){
      return prefs.setInt(key, value);
    }else if(value.runtimeType==double){
      return prefs.setDouble(key, value);
    }else if(value.runtimeType==bool){
      return prefs.setBool(key, value);
    }else{
      return false;
    }
  }
  /* 获取 */
  static Future<dynamic> getItem(String key) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.get(key);
  }
  /* 删除 */
  static Future<bool> removeItem(String key) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.remove(key);
  }
  /* 清除 */
  static Future<bool> clear() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.clear();
  }
}