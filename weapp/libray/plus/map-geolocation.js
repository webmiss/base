import Env from '../../env'
import Storage from '../ui/storage'
import amap from './amap-wx'

const Map = new amap.AMapWX({ key: Env.amap.amapKey});

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
export default (callback, fail) => {
  const self = this;
  // 经纬度
  wx.getLocation({
    type: 'wgs84',
    success(res) {
      _getCity(callback, fail, res.longitude, res.latitude, 'gps');
    }, fail: function () {
      wx.showModal({
        title: '是否授权当前位置',
        content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
        success: function (tip) {
          if (tip.confirm) {
            wx.openSetting({
              success: function (data) {
                if (data.authSetting["scope.userLocation"] === true) {
                  wx.showToast({
                    title: '授权成功',
                    icon: 'success',
                    duration: 1000
                  })
                } else {
                  wx.showToast({
                    title: '授权失败',
                    icon: 'success',
                    duration: 1000
                  })
                }
              }
            })
          }
        }
      })
    }
  });
}
