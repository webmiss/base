Page({
  data:{
    // 底部导航
    tabBar: {active:0,},
  },
  onLoad(e){
  },
  onShareAppMessage(){
    // 返回自定义分享信息
    return {title: 'My App',desc: 'My App description',path: 'pages/index/index',};
  },

  /* 切换导航 */
  navTab(n){
    this.setData({['tabBar.active']:n});
  },

});
