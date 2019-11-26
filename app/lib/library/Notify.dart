import 'package:flutter_local_notifications/flutter_local_notifications.dart';

/* 本地消息 */
class Notify{

  static FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin;
  static Map<String, dynamic> config = {'id':'id','name':'name','description':'description'};

  /* 初始化 */
  static Future<void> init() async {
    flutterLocalNotificationsPlugin = new FlutterLocalNotificationsPlugin();
    var initializationSettingsAndroid =
    new AndroidInitializationSettings('app_icon');
    var initializationSettingsIOS = IOSInitializationSettings(
        onDidReceiveLocalNotification: onDidReceiveLocalNotification);
    var initializationSettings = InitializationSettings(
        initializationSettingsAndroid, initializationSettingsIOS);
    flutterLocalNotificationsPlugin.initialize(initializationSettings,
        onSelectNotification: onSelectNotification);
  }

  /* 消息 */
  static Future<void> show(int id, String title, String content) async {
    var androidPlatformChannelSpecifics = AndroidNotificationDetails(
        config['id'], config['name'], config['description'],
        importance: Importance.Max, priority: Priority.High, ticker: 'ticker');
    var iOSPlatformChannelSpecifics = IOSNotificationDetails();
    var platformChannelSpecifics = NotificationDetails(
        androidPlatformChannelSpecifics, iOSPlatformChannelSpecifics);
    await flutterLocalNotificationsPlugin.show(
        id, title, content, platformChannelSpecifics,
        payload: 'item x');
  }

  /* 阅读（IOS） */
  static Future<void> onDidReceiveLocalNotification(int id, String title, String body, String payload) async {
    print('IOS');
  }

  /* 阅读（Android） */
  static Future<void> onSelectNotification(String payload) async {
    print('Android');
  }

}