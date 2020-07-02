import store from '../../store'
import create from '../../libray/create'
import Inc from '../../libray/Inc'
import Start from '../../libray/Start'

// const app = getApp();

create(store,{
  data:{
    /* 状态 */
    isLogin:false,
    uInfo:null,
    socket:null,
    geolocation: null,
    // 底部导航
    tabBar: {active:0,},
  },
  onLoad(e){
    // 项目
    Inc.self = this;
    /* 初始化 */
    Start.init();
  },
  /* 分享 */
  onShareAppMessage(){
    return {title: '',desc: '',path: 'pages/index/index',};
  },

  /* 打开链接 */
  openUrl(event){
    const url = event.currentTarget.dataset.url;
    const login = event.currentTarget.dataset.login;
    if(login && !this.data.isLogin) return my.navigateTo({url: '/pages/user/login'});
    else return my.navigateTo({url:url});
  },

  /* 切换导航 */
  navTab(n){
    this.setData({['tabBar.active']:n});
  },



});
