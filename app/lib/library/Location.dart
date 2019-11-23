import 'package:webmis/library/Persmission.dart';
import 'package:amap_location/amap_location.dart';

/* 获取定位 */
Future getLocation([Function fun]) async {
  try {
    // 获取权限
    await persmission('locationWhenInUse');
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
Future locationDispose() async {
  await AMapLocationClient.shutdown();
}