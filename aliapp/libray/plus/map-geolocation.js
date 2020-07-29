
import Storage from '../ui/storage'

/* 定位 */
export default (callback,fail)=>{
  // 经纬度
  my.getLocation({
    type: 1,
    success (res) {
      let data = {
        province: res.province,
        city: res.city,
        district: res.district,
        longitude: res.longitude,
        latitude: res.latitude,
      };
      // 保存本地
      Storage.setItem('geolocation',JSON.stringify(data));
      callback(data);
    },
    fail: fail,
  });
}
