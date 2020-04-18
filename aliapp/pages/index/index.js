Page({
  data:{
    // 底部导航
    tabBar: {active:0,},
  },
  onLoad(query){
  },
  onShareAppMessage(){
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  /* 返回 */
  navTab(n){
    console.log(n);
  },
});
