import Env from '../env.js'
import {Storage} from './ui/index'

/* Socket */
export default {

  self: null,

  /* 消息路由 */
  msgRouter(d){
    if(d.type=='group') this.msgGroup(d); //消息组
    else if(d.type=='msg') this.msg(d); //消息
    else if(d.type=='notify') this.msgNotify(d); //通知
  },

  /* 消息组 */
  msgGroup(d){
    this.self.store.data.uMsg.group = d.data;
    // 消息数
    const data = this.self.store.data.uMsg.group;
    let num = 0;
    for(let i in data) num += data[i].num;
    this.self.store.data.uMsg.num = num;
    this.self.update();
  },

  /* 消息 */
  msg(d){
    // 阅读
    const voice = Storage.getItem('voice');
    Notify(d.data.title,d.data.content,voice?true:false);
    // 追加
    const fid = d.data.uid==this.self.store.data.uInfo.uid?d.data.fid:d.data.uid;
    if(this.self.store.data.uMsg.group[''+fid]){
      this.self.store.data.uMsg.group[''+fid].msg.push(d.data);
      // 记录数量
      this.self.store.data.uMsg.group[''+fid].num++;
      this.self.store.data.uMsg.num++;
    }else{
      this.self.store.data.socket.send(JSON.stringify({type:'group'}));
    }
  },

  /* 通知 */
  msgNotify(d){
    console.log(d);
  },

  /* 启动 */
  start(self){
    this.self = self;
    // 重启Socket
    clearInterval(this.msgInterval);
    this.msgInterval = setInterval(()=>{
      if(this.self.store.data.isLogin && !this.self.store.data.socket) this.start();
    },3000);
    // Token
    let token = Storage.getItem('token');
    if(!token) return false;
    // 开启
    if(Env.socket.start) this.socket(token);
  },

  /* 链接 */
  socket(token){
    wx.connectSocket({url:Env.socket.server+'?token='+token});
    /* 链接 */
    wx.onSocketOpen(()=>{
      // 成功
      console.log('Socket开启');
      this.self.store.data.socket = true;
      this.self.update();
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
      // 是否成功
      if(d.code!=0) return Toast(d.msg);
      // 消息路由
      this.msgRouter(d);
    });
  },

  /* 关闭 */
  _closeMsg(){
    if(this.self.store.data.socket){
      wx.closeSocket();
      this.self.store.data.socket = null;
      this.self.store.data.uMsg.group = [];
      this.self.store.data.uMsg.num = '';
      this.self.update();
    }
  },

}