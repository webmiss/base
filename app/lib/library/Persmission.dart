import 'package:permission_handler/permission_handler.dart';

/* 检测并获取权限 */
Future<bool> persmission(String type) async{
  // 用户定位
  if(type=='locationWhenInUse'){
    PermissionStatus location = await PermissionHandler().checkPermissionStatus(PermissionGroup.locationWhenInUse);
    if(location == PermissionStatus.denied){
      Map<PermissionGroup, PermissionStatus> permissions = await PermissionHandler().requestPermissions([PermissionGroup.locationWhenInUse]);
      print(permissions);
      return false;
    }else{
      return true;
    }
  }
  return false;
}