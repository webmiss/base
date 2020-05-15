import Inc from './Inc'

/* Socket */
export default {

  /* 启动 */
  start(){
    // 重启Socket
    clearInterval(this.msgInterval);
    this.msgInterval = setInterval(()=>{
      if(Inc.self.store.data.isLogin && (!Inc.self.store.data.socket || Inc.self.store.data.socket.readyState!=1)) this.start();
    },3000);
    // Token
    let token = Inc.storage.getItem('token');
    if(!token) return false;
    // 开启
    this.socket(token);
  },

  /* 链接 */
  socket(token){
    Inc.self.store.data.socket = wx.connectSocket({url:Inc.config.socketServer+'?token='+token});
    Inc.self.update();
    /* 链接 */
    wx.onSocketOpen(()=>{
      console.log('Socket开启');
      // 心跳包
      clearInterval(this.heartbeat);
      this.heartbeat = setInterval(()=>{
        try{
          wx.sendSocketMessage({data:JSON.stringify({type:''})});
        }catch(e){
          this._closeMsg();
        }
      },10000);
      // 获取消息组
      setTimeout(()=>{
        wx.sendSocketMessage({data:JSON.stringify({type:'group'})});
      },1000);
    });
    /* 关闭 */
    wx.onSocketClose(()=>{
      console.log('Socket关闭');
      this._closeMsg();
    });
    /* 接收 */
    wx.onSocketMessage((res)=>{
      const d = JSON.parse(res.data);
      console.log(d);
      // 是否成功
      if(d.code!=0) return Inc.toast(d.msg);
      /* 消息组 */
      if(d.code==0 && d.type=='group'){
        Inc.self.store.data.uMsg.group = d.data;
        // 消息数
        this._getMsgNum();
      }
      /* 消息 */
      else if(d.code==0 && d.type=='msg'){
        // 阅读
        const voice = Inc.storage.getItem('voice');
        console.log(voice);
        // 追加
        const fid = d.data.uid==Inc.self.store.data.uInfo.uid?d.data.fid:d.data.uid;
        if(Inc.self.store.data.uMsg.group[''+fid]){
          Inc.self.store.data.uMsg.group[''+fid].msg.push(d.data);
          Inc.self.update();
          // 记录数量
          Inc.self.store.data.uMsg.group[''+fid].num++;
          Inc.self.store.data.uMsg.num++;
          Inc.self.update();
        }else{
          wx.sendSocketMessage({data:JSON.stringify({type:'group'})});
        }
      }
      /* 通知 */
      else if(d.code==0 && d.type=='notify'){
        // console.log(d);
        // console.log(Inc.self.store.data.uNotify);
      }
    });
  },

  /* 消息数 */
  _getMsgNum(){
    const data = Inc.self.store.data.uMsg.group;
    let num = 0;
    for(let i in data) num += data[i].num;
    Inc.self.store.data.uMsg.num = num;
    Inc.self.update();
  },

  /* 关闭 */
  _closeMsg(){
    if(Inc.self.store.data.socket){
      wx.closeSocket();
      Inc.self.store.data.socket = null;
      Inc.self.store.data.uMsg.group = [];
      Inc.self.store.data.uMsg.num = '';
      Inc.self.update();
    }
  },

}