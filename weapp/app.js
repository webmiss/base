App({
  /* 公共数据 */
  globalData:{
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
        console.log(res);
        this.globalData.statusBarHeight = res.statusBarHeight;
        this.globalData.screenWidth = res.screenWidth;
        this.globalData.screenHeight = res.screenHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.titleBarHeight = custom.height+(custom.top-res.statusBarHeight)*2;
      }
    });
  },
  onHide(){
  },
  onShow(){
  },
});