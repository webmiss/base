import Env from '../../env'
import amap from 'amap-wx';

/* 高德地图-初始化 */
const Map = new amap.AMapWX({ key: Env.amapKey});

/* 地图-搜索地址 */
export default (address,callback)=>{
  Map.getInputtips({
    keywords: address,
    success: callback,
  })
}