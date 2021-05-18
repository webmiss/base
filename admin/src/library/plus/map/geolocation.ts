import Storage from '@/library/Storage'

/* 地图-定位 */
const _geolocation = (callback: any, fail: any)=>{
  try{
    // @ts-ignore
    plus.geolocation.getCurrentPosition((res: any)=>{
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
      // @ts-ignore
      AMap.service('AMap.Geolocation',()=>{
        // 经纬度
        // @ts-ignore
        const geolocation = new AMap.Geolocation({enableHighAccuracy: false,timeout: 5000});
        geolocation.getCurrentPosition((status: any, res: any)=>{
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