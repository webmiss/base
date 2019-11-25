import 'package:flutter_local_notifications/flutter_local_notifications.dart';

/* 本地消息 */
class Notify{

  static FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin;

  /* 初始化 */
  static Future init() async {
    flutterLocalNotificationsPlugin = new FlutterLocalNotificationsPlugin();
  }

  static Future<void> show() async {
    var androidPlatformChannelSpecifics = AndroidNotificationDetails(
      'your channel id', 'your channel name', 'your channel description',
      importance: Importance.Max, priority: Priority.High, ticker: 'ticker');
    var iOSPlatformChannelSpecifics = IOSNotificationDetails();
    var platformChannelSpecifics = NotificationDetails(androidPlatformChannelSpecifics, iOSPlatformChannelSpecifics);
    await flutterLocalNotificationsPlugin.show(0,'plain title','plain body',platformChannelSpecifics,payload: 'item x');
  }

}