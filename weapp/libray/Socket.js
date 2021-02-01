import Env from '../env'
import Toast from './ui/ui-toast'
import Storage from './ui/storage'
import Msg from './Msg'

/* Socket */
export default {

  self: null,
  /* 启动 */
  start(self){
    this.self = self;
    // 重启Socket
    clearInterval(this.socketInterval);
    this.socketInterval = setInterval(()=>{
      if(this.self.store.data.isLogin && !this.self.store.data.socket) this.start(this.self);
    },3000);
    // Token
    const token = Storage.getItem('token');
    if(!token) return false;
    // 开启
    if(Env.socket.start) this.socketOpen(token);
  },

  /* WebSocket */
  socketOpen(token){
    wx.connectSocket({url:Env.socket.server+'?token='+token});
    // 链接
    wx.onSocketOpen(() => {
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
    });
    // 获取消息组
    // setTimeout(()=>{
    //   wx.sendSocketMessage({data:JSON.stringify({type:'group'})});
    // },1000);
    // 关闭
    wx.onSocketClose(()=>{
      console.log('Socket关闭');
      this._closeMsg();
    });
    // 接收
    wx.onSocketMessage((res)=>{
      const d = JSON.parse(res.data);
      // 是否成功
      if(d.code!=0) return Toast(d.msg);
      // 路由
      Msg.router(this.self,d);
    });
  },
  
  /* 关闭 */
  _closeMsg(){
    if(this.self.store.data.socket){
      wx.closeSocket();
      this.self.store.data.socket = null;
      this.self.update();
    }
  },

}