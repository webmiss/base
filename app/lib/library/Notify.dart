import 'package:flutter_local_notifications/flutter_local_notifications.dart';

/* 本地消息 */
class Notify{

  static FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin;

  /* 初始化 */
  static Future init() async {
    flutterLocalNotificationsPlugin = new FlutterLocalNotificationsPlugin();
    // 配置
  }

  /*  */
  static Future create() async {
    
  }

}