import 'dart:async';
import 'dart:io';
import 'dart:convert' as convert;
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:toast/toast.dart';
import 'package:http/http.dart' as http;
import 'package:dio/dio.dart';
import 'package:path/path.dart' as path;
import 'package:path_provider/path_provider.dart';
import 'package:package_info/package_info.dart';
import 'package:image_picker/image_picker.dart';
import 'package:image_cropper/image_cropper.dart';
import 'package:flutter_image_compress/flutter_image_compress.dart';
import 'package:amap_location/amap_location.dart';

// 配置文件
import 'env.dart';

/* 公共类 */
class Inc {

  // 接口
  static final String baseUrl = config['baseUrl'];
  static final String apiUrl = config['baseUrl']+config['apiUrl'];
  static final String name = config['name'];
  static final String copy = config['copy'];
  static final String themeColor = config['themeColor'];
  static final bool update = false;
  static final Map<String,String> upDateColor = config['upDateColor'];
  static final String upIosUrl = config['upIosUrl'];
  // 请求、响应
  static final _dio = new Dio(BaseOptions(
    connectTimeout: 5000,
    receiveTimeout: 3000,
    headers: {
    'accept-language': 'zh-cn',
    'content-type': 'application/json',
    // 'content-type': 'application/x-www-form-urlencoded',
    }
  ));

  /* Loading */
  static Widget loading({theme: 'ThreeBounce', color: Colors.grey, background: '#F2F2F2', size: 30.0}){
    // 主题
    Widget _theme;
    if(theme=='ThreeBounce') _theme = SpinKitThreeBounce(color: color, size: size);
    else if(theme=='RotatingPlane') _theme = SpinKitRotatingPlain(color: color, size: size);
    else if(theme=='DoubleBounce') _theme = SpinKitDoubleBounce(color: color, size: size);
    else if(theme=='Wave') _theme = SpinKitWave(color: color, size: size);
    else if(theme=='WanderingCubes') _theme = SpinKitWanderingCubes(color: color, size: size);
    else if(theme=='FadingFour') _theme = SpinKitFadingFour(color: color, size: size);
    else if(theme=='FadingCube') _theme = SpinKitFadingCube(color: color, size: size);
    else if(theme=='Pulse') _theme = SpinKitPulse(color: color, size: size);
    else if(theme=='ChasingDots') _theme = SpinKitChasingDots(color: color, size: size);
    else if(theme=='Circle') _theme = SpinKitCircle(color: color, size: size);
    else if(theme=='CubeGrid') _theme = SpinKitCubeGrid(color: color, size: size);
    else if(theme=='FadingCircle') _theme = SpinKitFadingCircle(color: color, size: size);
    else if(theme=='RotatingCircle') _theme = SpinKitRotatingCircle(color: color, size: size);
    else if(theme=='FoldingCube') _theme = SpinKitFoldingCube(color: color, size: size);
    else if(theme=='PumpingHeart') _theme = SpinKitPumpingHeart(color: color, size: size);
    else if(theme=='DualRing') _theme = SpinKitDualRing(color: color, size: size);
    else if(theme=='HourGlass') _theme = SpinKitHourGlass(color: color, size: size);
    else if(theme=='PouringHourGlass') _theme = SpinKitPouringHourglass(color: color, size: size);
    else if(theme=='FadingGrid') _theme = SpinKitFadingGrid(color: color, size: size);
    else if(theme=='Ring') _theme = SpinKitRing(color: color, size: size);
    else if(theme=='Ripple') _theme = SpinKitRipple(color: color, size: size);
    else if(theme=='SpinningCircle') _theme = SpinKitSpinningCircle(color: color, size: size);
    // 内容
    return Container(
      color: Inc.getColor(background),
      child: Center(child: _theme),
    );
  }

  /* Toast */
  static toast({context, String type='info', String msg='提示信息', color='', background='', double radius=5.0,}){
    if(type=='info'){
      color = color==''?config['toast']['info']['color']:color;
      background = background==''?config['toast']['info']['background']:background;
      Toast.show(msg,context, backgroundRadius: radius, textColor: color, backgroundColor: background, gravity: Toast.CENTER);
    }else if(type=='success'){
      color = color==''?config['toast']['success']['color']:color;
      background = background==''?config['toast']['success']['background']:background;
      Toast.show(msg,context, backgroundRadius: radius, textColor: color, backgroundColor: background, gravity: Toast.CENTER);
    }else if(type=='error'){
      color = color==''?config['toast']['error']['color']:color;
      background = background==''?config['toast']['error']['background']:background;
      Toast.show(msg,context, backgroundRadius: radius, textColor: color, backgroundColor: background, gravity: Toast.CENTER);
    }
  }
  
  /* 十六进制颜色值 */
  static Color getColor(String s) {
    if (s == null || s.length != 7 || int.tryParse(s.substring(1, 7), radix: 16) == null) s='#999999';
    return new Color(int.parse(s.substring(1, 7), radix: 16) + 0xFF000000);
  }

  /* 照片 */
  static Future<File> getPhoto() async {
    try {
       return await ImagePicker.pickImage(source: ImageSource.gallery);
     } on FormatException{
      return null;
    }
  }

  /* 相机 */
  static Future<File> getCamera() async {
    try {
       return await ImagePicker.pickImage(source: ImageSource.camera);
     } on FormatException{
      return null;
    }
  }

  /* 图片裁切 */
  static Future<File> cropImage(File imageFile, [int width, int height]) async {
    width = width!=null?width:340;
    height = height!=null?height:340;
    return await ImageCropper.cropImage(
      sourcePath: imageFile.path,
      // ratioX: 1.0,
      // ratioY: 1.0,
      maxWidth: width,
      maxHeight: height,
    );
  }

  /* 图片压缩 */
  static Future<File> compress(File file, [int minWidth, int minHeight]) async {
    // 目录
    Directory cacheDir = await getTemporaryDirectory();
    String dir = cacheDir.path;
    var imgDir = new Directory("$dir/img/");
    await imgDir.create();
    String cacheImg = imgDir.path+path.basename(file.path);
    // 压缩
    minWidth = minWidth!=null?minWidth:640;
    minHeight = minHeight!=null?minHeight:1024;
    return await FlutterImageCompress.compressAndGetFile(
      file.absolute.path, cacheImg,
      minWidth: minWidth,
      minHeight: minHeight,
      quality: 80,
      rotate: 0,
    );
  }

  /* 图片转Base64 */
  static Future<String> imageBase64(String path) async {
    File file = new File(path);
    List<int> imageBytes = await file.readAsBytes();
    return convert.base64Encode(imageBytes);
  }

  /* Base64转图片 */
  static Future<Image> base64Image(String base64Txt) async {
    Uint8List decodeTxt = convert.base64.decode(base64Txt);
    return Image.memory(
      decodeTxt,
      width: 100,
      fit: BoxFit.fitWidth,
      gaplessPlayback: true,  //防止重绘
    );
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

  /* Get请求 */
  static Future get(String url, [Map<String, dynamic> params]) async {
    String _param = '';
    params.forEach((k,v) => _param += k+'='+v+'&');
    url = _param!=''?url+'?'+_param:url;
    // 请求
    var response = await http.get(url+_param);
    if (response.statusCode == 200) {
      return convert.jsonDecode(response.body);
    }else{
      return response.statusCode;
    }
  }

  /* Post请求 */
  static Future post(String url, Map<String, dynamic> params) async {
    var response = await http.post(url, body: params);
    if (response.statusCode == 200) {
      return convert.jsonDecode(response.body);
    }else{
      return response.statusCode;
    }
  }

  /* 文件-上传 */
  static Future upFile(String url, String filePath, [Object progress]) async {
    String name = path.basename(filePath);
    progress = progress!=null?progress:(){};
    FormData formData = new FormData.fromMap({
      'up': await MultipartFile.fromFile(filePath, filename: name),
    });
    try {
      return await _dio.post(url, data: formData, onReceiveProgress: progress);
    } on DioError catch (e) {
      return formatDioError(e);
    }
  }

  /* 文件-下载 */
  static Future downFile(String url, String file, Object progress) async {
    try {
      return await _dio.download(url, file,onReceiveProgress: progress);
    } on DioError catch (e) {
      return formatDioError(e);
    }
  }

  /* 请求错误 */
  static String formatDioError(DioError e) {
    if (e.type == DioErrorType.CONNECT_TIMEOUT) {
      return '连接超时';
    } else if (e.type == DioErrorType.SEND_TIMEOUT) {
      return '请求超时';
    } else if (e.type == DioErrorType.RECEIVE_TIMEOUT) {
      return '响应超时';
    } else if (e.type == DioErrorType.RESPONSE) {
      return '出现异常';
    } else if (e.type == DioErrorType.CANCEL) {
      return '请求取消';
    } else {
      return '未知错误';
    }
  }

  /* 获取定位 */
  static Future location([Function fun]) async {
    try {
      // 获取权限
      await checkPersmission('locationWhenInUse');
      // 高德KEY
      await AMapLocationClient.setApiKey("85f24c342342b9206e8e7cf0a84d2298");
      await AMapLocationClient.startup(AMapLocationOption(desiredAccuracy:CLLocationAccuracy.kCLLocationAccuracyHundredMeters));
      // 定位
      if(fun==null){
        return await AMapLocationClient.getLocation(true);
      }else{
        AMapLocationClient.onLocationUpate.listen(fun);
        AMapLocationClient.startLocation();
        return '';
      }
    } on Exception {
      return null;
    }
  }
  /* 销毁定位 */
  static Future locationDispose() async {
    await AMapLocationClient.shutdown();
  }

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

  /* 检测并获取权限 */
  static Future<bool> checkPersmission(String type) async{
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
}

