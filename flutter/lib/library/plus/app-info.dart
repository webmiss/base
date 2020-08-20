import 'package:package_info/package_info.dart';
import 'dart:io';

/* APP信息 */
Future appInfo() async {
  PackageInfo packageInfo = await PackageInfo.fromPlatform();
  String platform = '';
  if(Platform.isAndroid) platform = 'Android';
  else if(Platform.isIOS) platform = 'IOS';
  Map<String, String> info = {
    'platform': platform,
    'appName': packageInfo.appName,
    'packageName': packageInfo.packageName,
    'version': packageInfo.version,
    'buildNumber': packageInfo.buildNumber,
  };
  return info;
}