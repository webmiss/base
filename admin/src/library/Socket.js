import Env from '@/env'
import Toast from '../library/ui/ui-toast'
import Storage from '../library/ui/storage'
import Notify from '../library/plus/notify'

/* Socket */
export default {

  self: null,
  store: null,

  /* 消息路由 */
  msgRouter(d){
    if(d.type=='group') this.msgGroup(d); //消息组
    else if(d.type=='msg') this.msg(d); //消息
    else if(d.type=='notify') this.msgNotify(d); //通知
  },

  /* 消息 */
  msg(d){
    // 阅读
    const voice = Storage.getItem('voice');
    Notify(d.data.title,d.data.content,voice?true:false);
  },

  /* 启动 */
  start(self){
    this.self = self;
    this.store = this.self.$store.state;
    // 重启Socket
    clearInterval(this.socketInterval);
    this.socketInterval = setInterval(()=>{
      if(this.store.isLogin && (!this.store.socket || this.store.socket.readyState!=1)) this.start(self);
    },Env.socket.time);
    // Token
    const token = Storage.getItem('token');
    if(!token) return false;
    // 开启
    if(Env.socket.start) this.socket(token);
  },

  /* 链接 */
  socket(token){
    this.store.socket = new WebSocket(Env.socket.server+'?token='+token);
    /* 链接 */
    this.store.socket.onopen = ()=>{
      console.log('Socket开启');
      // 心跳包
      clearInterval(this.heartbeat);
      this.heartbeat = setInterval(()=>{
        try{
          this.store.socket.send(JSON.stringify({type:''}));
        }catch(e){
          this._closeMsg();
        }
      },10000);
    }
    /* 关闭 */
    this.store.socket.onclose = ()=>{
      console.log('Socket关闭');
      this._closeMsg();
    }
    /* 接收 */
    this.store.socket.onmessage = (res)=>{
      const d = JSON.parse(res.data);
      // 是否成功
      if(d.code!=0) return Toast(d.msg);
      // 消息路由
      this.msgRouter(d);
    };
  },
  
  /* 关闭 */
  _closeMsg(){
    if(!this.store.socket) return;
    this.store.socket.close();
    this.store.socket = null;
  },

}