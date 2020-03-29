import 'dart:async';
import 'dart:io';
import 'package:package_info/package_info.dart';
import 'package:path_provider/path_provider.dart';

/* APP信息 */
class Info{

  /* APP信息 */
  static Future appInfo() async {
    PackageInfo packageInfo = await PackageInfo.fromPlatform();
    String platform = '';
    if(Platform.isAndroid){
      platform = 'Android';
    }else if(Platform.isIOS){
      platform = 'IOS';
    }
    Map<String, String> info = {
      'platform': platform,
      'appName': packageInfo.appName,
      'packageName': packageInfo.packageName,
      'version': packageInfo.version,
      'buildNumber': packageInfo.buildNumber,
    };
    return info;
  }

  /* APP目录 */
  static Future<Directory> appDir() async {
    return await getApplicationDocumentsDirectory();
  }

  /* 目录大小 */
  static Future<String> dirSize(String path) async {
    int size = 0;
    Directory dir = Directory(path);
    // 目录、文件列表
    Stream<FileSystemEntity> list = dir.list(recursive: true, followLinks: true);
    await for(FileSystemEntity entity in list) {
      print(entity.path);
      if(entity.statSync().type.toString() == 'file'){
        print(entity.statSync().size);
        size += entity.statSync().size;
      }
    }
    return (size/1024/1024).toStringAsFixed(2)+'MB';
  }

  /* 清理缓存 */
  static Future<Null> cacheClear() async {
    Directory cacheDir = await getTemporaryDirectory();
    Stream<FileSystemEntity> list = cacheDir.list(recursive: true, followLinks: true);
    await for(FileSystemEntity entity in list) {
      entity.delete();
    }
  }

}