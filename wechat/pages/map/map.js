import Config from '../../config'
import Inc from '../../utils/Inc'

const app = getApp();

Page({
  data: {
    // 主题颜色
    themeColor: Config.themeColor,
    // 导航
    navHeight: app.globalData.nav.height,
    // 地图
    map:{},
    markers: [],
  },
  onLoad(){
    /* 定位 */
    Inc.getLocation((res)=>{
      // 中心点
      this.setData({map:res});
      // 标记
      let markers = [
        {latitude: res.latitude+0.001, longitude: res.longitude-0.001, title: '标记'}
      ];
      this.setData({markers: markers});
    });
  },
  
  /* 返回 */
  goBack(){
    wx.navigateBack({data:1});
  },

  /* 首页-下拉刷新 */
  onPullDownRefresh(){
    wx.stopPullDownRefresh();
    console.log('刷新');
  },
  /* 首页-上拉加载 */
  onReachBottom(){
    console.log('加载');
  },

});