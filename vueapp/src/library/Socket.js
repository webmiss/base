import Env from '@/env'
import Toast from '../library/ui/ui-toast'
import Storage from '../library/ui/storage'
import Msg from './Msg'

/* Socket */
export default {

  self: null,
  store: null,
  socket: null,

  /* 启动 */
  start(self){
    this.self = self;
    this.store = this.self.$store.state;
    // 重启Socket
    clearInterval(this.socketInterval);
    this.socketInterval = setInterval(()=>{
      if(this.store.isLogin && (!this.socket || this.socket.readyState!=1)) this.start(self);
    },Env.socket.time);
    // Token
    const token = Storage.getItem('token');
    if(!token) return false;
    // 开启
    if(Env.socket.start) this.socket(token);
  },

  /* WebSocket */
  socket(token){
    this.socket = new WebSocket(Env.socket.server+'?token='+token);
    // 链接
    this.socket.onopen = ()=>{
      console.log('Socket开启');
      // 心跳包
      clearInterval(this.heartbeat);
      this.heartbeat = setInterval(()=>{
        try{
          this.socket.send(JSON.stringify({type:''}));
        }catch(e){
          this._closeMsg();
        }
      },10000);
    }
    // 关闭
    this.socket.onclose = ()=>{
      console.log('Socket关闭');
      this._closeMsg();
    }
    // 接收
    this.socket.onmessage = (res)=>{
      const d = JSON.parse(res.data);
      // 是否成功
      if(d.code!=0) return Toast(d.msg);
      // 消息路由
      Msg.router(this.socket,d);
      // this.msgRouter(d);
    };
  },
  
  /* 关闭 */
  _closeMsg(){
    if(!this.socket) return;
    this.socket.close();
    this.socket = null;
  },

}