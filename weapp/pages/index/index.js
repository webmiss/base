import store from '../../store'
import create from '../../libray/store/create'
import Start from '../../libray/Start'

import {NavigateTo,Loading} from '../../libray/ui/index'

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
  onShareAppMessage(res){
    // 分享
    const row = res.target.dataset.row;
    return {title:row.title,path:row.url,imageUrl:row.img};
  },
  onShow(){
  },
  onLoad(e){
    
    /* 初始化 */
    Start.init(this);
    /* 扫码 */
    const url = e.q;
    if (url) {
      // let type = Inc.getQueryString(url,'name');
    }
    /* 加载数据 */
    this.indexLoad();
  },

  /* 切换导航 */
  navTab(e){
    this.setData({['tabBar.active']:e.detail});
  },

  /* 测试 */
  Demo(){
    NavigateTo('/pages/demo/demo',{id:123,sn:456});
  },

  /* 打开链接 */
  openUrl(event){
    const url = event.currentTarget.dataset.url;
    const login = event.currentTarget.dataset.login;
    if(login && !this.data.isLogin) return NavigateTo('/pages/user/login');
    else return NavigateTo(url);
  },

  /* 加载数据 */
  indexLoad(){},

});