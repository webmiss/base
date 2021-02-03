import App from '@/main';
import Env from '@/env'
import Toast from '@/library/ui/ui-toast'
import Storage from '@/library/ui/storage'
import Msg from './Msg'

/* Socket */
const state: any = null;
const socketInterval: number = 0;
const heartbeatInterval: number = 0;
export default {

  state,
  socketInterval,
  heartbeatInterval,

  /* 启动 */
  start(){
    // 状态
    this.state = App.$store.state;
    // 是否连接
    clearInterval(this.socketInterval);
    this.socketInterval = setInterval(()=>{
      if(this.state.isLogin && (!this.state.socket || this.state.socket.readyState!=1)) this.start();
    },Env.socket.time);
    // Token
    const token = Storage.getItem('token');
    if(!token) return false;
    // 开启
    if(Env.socket.start) this.socketOpen(token);
  },

  /* WebSocket */
  socketOpen(token: string){
    this.state.socket = new WebSocket(Env.socket.server+'?type='+Env.socket.type+'&token='+token);
    // 链接
    this.state.socket.onopen = ()=>{
      console.log('Socket开启');
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = setInterval(()=>{
        try{
          this.state.socket.send(JSON.stringify({type:''}));
        }catch(e){
          this._closeMsg();
        }
      },Env.socket.heartbeat);
    }
    // 关闭
    this.state.socket.onclose = ()=>{
      console.log('Socket关闭');
      this._closeMsg();
    }
    // 接收
    this.state.socket.onmessage = (res: any)=>{
      const d = JSON.parse(res.data);
      // 是否成功
      if(d.code!=0) return Toast(d.msg);
      // 路由
      Msg.router(this.state.socket,d);
    };
  },
  
  /* 关闭 */
  _closeMsg(){
    if(!this.state.socket) return;
    this.state.socket.close();
    this.state.socket = null;
  },

}