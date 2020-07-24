import Env from '@/env'
import {Toast,Storage} from '@/library/inc'
import {Notify} from '@/library/plus'

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
    this.self.$store.state.uMsg.group = d.data;
    // 消息数
    const data = this.self.$store.state.uMsg.group;
    let num = 0;
    for(let i in data) num += data[i].num;
    this.self.$store.state.uMsg.num = num;
  },

  /* 消息 */
  msg(d){
    // 阅读
    const voice = Storage.getItem('voice');
    Notify(d.data.title,d.data.content,voice?true:false);
    // 追加
    const fid = d.data.uid==this.self.$store.state.uInfo.uid?d.data.fid:d.data.uid;
    if(this.self.$store.state.uMsg.group[''+fid]){
      this.self.$store.state.uMsg.group[''+fid].msg.push(d.data);
      // 记录数量
      this.self.$store.state.uMsg.group[''+fid].num++;
      this.self.$store.state.uMsg.num++;
    }else{
      this.self.$store.state.socket.send(JSON.stringify({type:'group'}));
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
      if(this.self.$store.state.isLogin && (!this.self.$store.state.socket || this.self.$store.state.socket.readyState!=1)) this.start(self);
    },3000);
    // Token
    const token = Storage.getItem('token');
    if(!token) return false;
    // 开启
    if(Env.socket.start) this.socket(token);
  },

  /* 链接 */
  socket(token){
    this.self.$store.state.socket = new WebSocket(Env.socket.server+'?token='+token);
    /* 链接 */
    this.self.$store.state.socket.onopen = ()=>{
      console.log('Socket开启');
      // 心跳包
      clearInterval(this.heartbeat);
      this.heartbeat = setInterval(()=>{
        try{
          this.self.$store.state.socket.send(JSON.stringify({type:''}));
        }catch(e){
          this._closeMsg();
        }
      },10000);
      // 获取消息组
      setTimeout(()=>{
        this.self.$store.state.socket.send(JSON.stringify({type:'group'}));
      },1000);
    }
    /* 关闭 */
    this.self.$store.state.socket.onclose = ()=>{
      console.log('Socket关闭');
      this._closeMsg();
    }
    /* 接收 */
    this.self.$store.state.socket.onmessage = (res)=>{
      const d = JSON.parse(res.data);
      // 是否成功
      if(d.code!=0) return Toast(d.msg);
      // 消息路由
      this.msgRouter(d);
    };
  },
  
  /* 关闭 */
  _closeMsg(){
    if(!this.self.$store.state.socket) return;
    this.self.$store.state.socket.close();
    this.self.$store.state.socket = null;
    this.self.$store.state.uMsg.group = [];
    this.self.$store.state.uMsg.num = '';
  },

}