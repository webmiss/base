Page({
  data:{
    test: 'Test',
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
  goBack(){
    console.log('back');
    this.setData({test:'Back'});
  },
});
