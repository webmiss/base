App({
  /* 公共数据 */
  globalData:{
    platform: '',
    // 系统信息
    statusBarHeight: 0,
    titleBarHeight: 0,
    screenWidth: 0,
    screenHeight: 0,
  },
  /* 初始化 */
  onLaunch(){
    // 状态栏信息
    wx.getSystemInfo({
      success: (res)=>{
        this.globalData.platform = res.platform;
        this.globalData.statusBarHeight = res.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.titleBarHeight = custom.height+(custom.top-res.statusBarHeight)*2;
        this.globalData.screenWidth = res.screenWidth;
        this.globalData.screenHeight = res.screenHeight;
      }
    });
  },
  onHide(){
  },
  onShow(){
  },
});