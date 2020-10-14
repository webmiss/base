import Env from '@/env'
// import VueAMap from 'vue-amap';
import {Storage} from '@/library/ui'

/* 高德地图-初始化 */
// VueAMap.initAMapApiLoader({
//   key: Env.amap.jsapi_key,
//   plugin: ['AMap.Geolocation','PlaceSearch'],
//   v: '1.4.15'
// });

/* 地图-搜索地址 */
export default (name,callback,fail)=>{
  AMap.service(['AMap.PlaceSearch'], ()=>{
    let location = Storage.getItem('GeoLocation');
    location = location?JSON.parse(location):{city:'昆明市'};
    const place = new AMap.PlaceSearch({city:location.city});
    place.search(name,(status, result)=>{
      if(result && result.poiList){
        callback(result.poiList.pois);
      }else fail(status);
    });
  });
}