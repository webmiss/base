import Camera from './camera'
import MapGeolocation from './map-geolocation'
import Photo from './photo'
import MapAddress from './map-address'
import MapOpen from './map-open'
import Pay from './pay'

/* 全部 */
export default {
  Camera, //拍照
  MapGeolocation, //地图-定位
  MapAddress, //地图-搜索
  Photo, //照片
  MapOpen, //打开第三方地图
  Pay, //支付
}
/* 局部 */
export {
  Camera,
  MapGeolocation,
  Photo,
}