import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:webmis/library/ui/ui-dialog.dart';

class Perm {

  /* 检测并获取权限 */
  static Future<bool> request(BuildContext context, String type) async{
    TargetPlatform _platform = Theme.of(context).platform;
    // 检测
    bool status = await isTrue(type);
    if(status) return status;
    // 获取:相机、定位
    bool res;
    if(type=='camera'){
      res = await Permission.camera.request().isGranted;
      if(!res){
        uiDialog.confirm(
          context,
          title:'相机',
          message: '头像和扫描功能，需要您在“设置”中手动开启”相机“权限',
          confirmText: '去设置',
          confirm: (obj){
            openAppSettings();
            obj.close();
          },
          cancel: (obj){
            obj.close();
          },
        );
      }
    }else if(type=='location'){
      if(TargetPlatform.android == _platform){
        res = await Permission.locationAlways.request().isGranted &&
        await Permission.storage.request().isGranted &&
        await Permission.phone.request().isGranted;
      }else if(TargetPlatform.iOS == _platform){
        res = await Permission.locationAlways.request().isGranted &&
        await Permission.storage.request().isGranted;
      }
      if(!res){
        uiDialog.confirm(
          context,
          title:'定位',
          message: '为了精准定位附近商家，需要您在“设置”中手动开启”定位“权限',
          confirmText: '去设置',
          confirm: (obj){
            openAppSettings();
            obj.close();
          },
          cancel: (obj){
            obj.close();
          },
        );
      }
    }else if(type=='notification'){
      res = await Permission.notification.request().isGranted;
      if(!res){
        uiDialog.confirm(
          context,
          title:'通知',
          message: '为了推送更多精彩信息，需要您在“设置”中手动开启”通知“权限',
          confirmText: '去设置',
          confirm: (obj){
          openAppSettings();
            obj.close();
          },
          cancel: (obj){
            obj.close();
          },
        );
      }
    }
    // 结果
    return res;
  }

  /* 检测权限 */
  static Future<bool> isTrue(String type) async{
    bool status;
    // 相机、定位
    if(type=='camera') status = await Permission.camera.isRestricted;
    else if(type=='location') status = await Permission.locationAlways.isRestricted;
    if(type=='notification') status = await Permission.notification.isRestricted;
    // 结果
    return status;
  }
  
}