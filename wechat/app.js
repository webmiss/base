import Config from './config'
import Inc from './utils/Inc'
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
    this.openSocket();
  },
  onHide(){
    /* Socket重连机制 */
    let hiddenTime = new Date().getTime();
    Inc.storage.setItem('HiddenTime',hiddenTime);
  },
  onShow(){
    // 10秒后关闭Socker
    let hiddenTime = Inc.storage.getItem('HiddenTime');
    let visibleTime = new Date().getTime();
    if((visibleTime-hiddenTime)/1000 > 10){
      wx.closeSocket();
      setTimeout(()=>{
        this.openSocket();
      },3000);
    }else{console.log('保持链接');}
  },
  /* Socket */
  openSocket(){
    let token = Inc.storage.getItem('token');
    if(!token) return;
    wx.connectSocket({url:Config.socketServer+'?token='+token});
    /* 链接 */
    wx.onSocketOpen(()=>{
      console.log('消息系统');
      // 获取新消息
      clearInterval(this.globalData.msgInterval);
      this.globalData.msgInterval = setInterval(()=>{
        wx.sendSocketMessage({data:JSON.stringify({type:'newMsg'})});
      },Config.msgNew);
    });
    /* 消息 */
    wx.onSocketMessage((e)=>{
      Inc.notify('消息',e.data);
      const msg = JSON.parse(e.data);
      if(msg.code==0 && msg.type=='system'){
        Inc.notify(msg.title,msg.content);
      }else if(msg.code==0 && msg.type=='newMsg'){
        this.globalData.msgNew = msg.num;
        if(msg.num>0){
          Inc.notify(msg.title,msg.content);
        }
      }
    });
    /* 关闭 */
    wx.onSocketClose(()=>{
      console.log('关闭消息');
        clearInterval(this.globalData.msgInterval);
    });
  },
});