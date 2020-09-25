import Env from '../../env'
import Storage from '../ui/storage'
import amap from './amap-wx'

const Map = new amap.AMapWX({ key: Env.amap.jsapi_key});

// 高德-城市信息
const _getCity = (callback,fail,longitude,latitude)=>{
  const location = longitude&&latitude?longitude+','+latitude:'';
  Map.getRegeo({
    location: location,
    success(res){
      let data = {
        province: res[0].regeocodeData.addressComponent.province,
        city: res[0].regeocodeData.addressComponent.city,
        district: res[0].regeocodeData.addressComponent.district,
        longitude: longitude,
        latitude: latitude,
      };
      // 保存本地
      Storage.setItem('geolocation',JSON.stringify(data));
      callback(data);
    },
    fail: fail,
  });
};

/* 定位 */
export default (callback,fail)=>{
  // 经纬度
  wx.getLocation({
    type: 'wgs84',
    success (res) {
      _getCity(callback,fail,res.longitude,res.latitude);
    }
  });
}
