import Vue from 'vue';
import Env from '@/env'
import Plus from '@/library/Plus'

export default {
  
  /* 启动 */
  start(){
    let token = Vue.prototype.$storage.getItem('token');
    if(!token) return;
    Vue.prototype.$obj.socket = new WebSocket(Env.socketServer+'?token='+token);
    /* 链接 */
    Vue.prototype.$obj.socket.onopen = ()=>{
      console.log('消息系统');
      // 心跳包
      clearInterval(this.heartbeat);
      this.heartbeat = setInterval(()=>{
        try{
          Vue.prototype.$obj.socket.send(JSON.stringify({type:''}));
        }catch(e){ this.start(); }
      },10000);
      // 新消息
      try{
        Vue.prototype.$obj.socket.send(JSON.stringify({type:'newMsg'}));
        clearInterval(this.msgInterval);
        this.msgInterval = setInterval(()=>{
          Vue.prototype.$obj.socket.send(JSON.stringify({type:'newMsg'}));
        },Env.msgNew);
      }catch(e){ this.start(); }
    }
    /* 消息 */
    Vue.prototype.$obj.socket.onmessage = (e)=>{
      const msg = JSON.parse(e.data);
      if(msg.code==0 && msg.type=='system'){
        // 提示
        Plus.notify(msg.title,msg.content,(obj)=>{
          if(msg.id) this.closeMsg(msg.id);
          obj.close();
        });
        // 刷新消息数
        Vue.prototype.$obj.socket.send(JSON.stringify({type:'newMsg'}));
      }else if(msg.code==0 && msg.type=='newMsg'){
        Vue.prototype.$storage.setItem('msgNew',msg.num);
        if(msg.num>0) Vue.prototype.$obj.socket.send(JSON.stringify({type:'getMsg'}));
      }else if(msg.code==0 && msg.type=='getMsg'){
        if(msg.title){
          Plus.notify(msg.title,msg.content,(obj)=>{
            if(msg.id) this.closeMsg(msg.id);
            obj.close();
          });
        }
      }
    }
    /* 关闭 */
    Vue.prototype.$obj.socket.onclose = ()=>{
      console.log('消息关闭');
      clearInterval(this.msgInterval);
      this.msgInterval = setInterval(()=>{
        // this.start();
        // window.location.reload();
      },10000);
    }
  },

  /* 已读消息 */
  closeMsg(id){
    Vue.prototype.$ajax.post(Vue.prototype.$config.apiUrl+'Usermain/msgNewState','token='+Vue.prototype.$storage.getItem('token')+'&id='+id).then((res)=>{
      // 刷新消息数
      Vue.prototype.$obj.socket.send(JSON.stringify({type:'newMsg'}));
    });
  },

}