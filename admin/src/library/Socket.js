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
        if(Vue.prototype.$obj.socket) Vue.prototype.$obj.socket.send(JSON.stringify({type:''}));
      },10000);
      // 新消息
      Vue.prototype.$obj.socket.send(JSON.stringify({type:'newMsg'}));
      clearInterval(this.msgInterval);
      this.msgInterval = setInterval(()=>{
        Vue.prototype.$obj.socket.send(JSON.stringify({type:'newMsg'}));
        Vue.prototype.$obj.socket.send(JSON.stringify({type:'getMsg'}));
      },Env.msgNew);
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
      Vue.prototype.$obj.socket = null;
      setTimeout(()=>{
        if(!Vue.prototype.$obj.socket) this.start();
      },3000);
    }
  },

  /* 已读消息 */
  closeMsg(id){
    Vue.prototype.$ajax.post(Vue.prototype.$config.apiUrl+'UserMain/msgNewState','token='+Vue.prototype.$storage.getItem('token')+'&id='+id).then((res)=>{
      // 刷新消息数
      Vue.prototype.$obj.socket.send(JSON.stringify({type:'newMsg'}));
    });
  },

  /* 重启机制 */
  event(){
    document.addEventListener('visibilitychange',()=>{
      if(document.visibilityState == 'hidden') {
        let hiddenTime = new Date().getTime();
        Vue.prototype.$storage.setItem('HiddenTime',hiddenTime);
      }else{
        // 10秒后关闭
        let hiddenTime = Vue.prototype.$storage.getItem('HiddenTime');
        let visibleTime = new Date().getTime();
        if((visibleTime-hiddenTime)/1000 > 10){
          if(Vue.prototype.$obj.socket) Vue.prototype.$obj.socket.close();
          setTimeout(()=>{
            this.start();
          },1000);
        }else{console.log('保持链接');}
      }
    });
  },

}