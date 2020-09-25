import Env from '@/env'
import VueAMap from 'vue-amap';
import Storage from '@/library/ui/storage'

/* 高德地图-初始化 */
VueAMap.initAMapApiLoader({
  key: Env.amap.jsapi_key,
  plugin: ['AMap.Geolocation','PlaceSearch'],
  v: '1.4.15'
});

/* 地图-定位 */
const _geolocation = (callback,fail)=>{
  try{
    plus.geolocation.getCurrentPosition((res)=>{
      let data = {
        longitude: res.coords.longitude,
        latitude: res.coords.latitude,
        province: res.address.province,
        city: res.address.city,
        district: res.address.district,
        street: res.address.street,
        streetnum: res.address.streetNum,
        poiname: res.address.poiName,
        address: res.address.poiName+res.address.streetNum,
      };
      // 保存本地
      Storage.setItem('geolocation',JSON.stringify(data));
      callback(data);
    },fail);
  }catch(e){
    try{
      AMap.service('AMap.Geolocation',()=>{
        // 经纬度
        const geolocation = new AMap.Geolocation({enableHighAccuracy: false,timeout: 5000});
        geolocation.getCurrentPosition((status, res)=>{
          if(res && res.position){
            let data = {
              longitude: res.position.lng,
              latitude: res.position.lat,
              province: res.addressComponent.province,
              city: res.addressComponent.city,
              district: res.addressComponent.district,
              street: res.addressComponent.street,
              streetnum: res.addressComponent.streetNumber,
              poiname: res.addressComponent.township,
              address: res.addressComponent.township+res.addressComponent.streetNumber,
            };
            // 保存本地
            Storage.setItem('geolocation',JSON.stringify(data));
            callback(data);
          }
        });
      });
    }catch(e){
      setTimeout(()=>{ _geolocation(callback,fail); },3000);
    }
  }
}

export default _geolocation