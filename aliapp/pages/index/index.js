import store from '../../store'
import create from '../../libray/create'
import Inc from '../../libray/Inc'

create(store,{
  data:{
    isLogin: null,
    uInfo: null,
    uMsg: null,
    // 底部导航
    tabBar: {active:0,},
  },
  onLoad(e){
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
