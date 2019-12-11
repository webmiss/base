import Config from './config'
import Inc from './utils/Inc'
import Socket from './utils/Socket'
App({
  /* 公共数据 */
  globalData:{
    // 状态栏
    nav: {statusBar:0,height:0,custom:{}},
    // 新消息
    msgNew: 0,
    msgInterval: null,
  },
  /* 初始化 */
  onLaunch(){
    // 状态栏信息
    wx.getSystemInfo({
      success: (res)=>{
        // 状态栏高度
        this.globalData.nav.statusBar = res.statusBarHeight;
        // 菜单按钮
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.nav.custom = custom;
        // 保存高度
        this.globalData.nav.height = custom.bottom + custom.top - res.statusBarHeight;
      }
    });
    // Socket
    Socket.start();
  },
  onHide(){
  },
  onShow(){
  },
});