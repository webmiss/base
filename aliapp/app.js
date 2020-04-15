App({
  /* 公共数据 */
  globalData:{
    // 系统信息
    statusBarHeight: 0,
    titleBarHeight: 0,
    screenWidth: 0,
    screenHeight: 0,
  },
  onLaunch() {
    my.getSystemInfo({
      success: (res)=>{
        console.log(res);
        this.globalData.statusBarHeight = res.statusBarHeight;
        this.globalData.titleBarHeight = res.titleBarHeight;
        this.globalData.screenWidth = res.screenWidth;
        this.globalData.screenHeight = res.screenHeight;
      },
    });
  },
  onHide(){
  },
  onShow(){
  },
});
