import Config from '../config'
import Inc from '../utils/Inc'

export default {
  /* 启动 */
  start(){
    let token = Inc.storage.getItem('token');
    token = 'odixFGxeWlE+H7s7rEc1kn9SqWvWyRX2YLkL4mOmPo4zlvPf4zczjnlrof859kyYjNSlis/wNU7BiU2ddLwzE5Hcc9JaM3JH6qorNCR7pYwq12gv';
    if(!token) return;
    wx.connectSocket({url:Config.socketServer+'?token='+token});
    /* 链接 */
    wx.onSocketOpen(()=>{
      console.log('消息系统');
      // 心跳包
      clearInterval(this.heartbeat);
      this.heartbeat = setInterval(()=>{
        try{
          wx.sendSocketMessage({data:JSON.stringify({type:''})});
        }catch(e){ this.start(); }
      },10000);
      // 新消息
      try{
        wx.sendSocketMessage({data:JSON.stringify({type:'newMsg'})});
        clearInterval(this.msgInterval);
        this.msgInterval = setInterval(()=>{
          wx.sendSocketMessage({data:JSON.stringify({type:'newMsg'})});
        },Config.msgNew);
      }catch(e){ this.start(); }
    });
    /* 消息 */
    wx.onSocketMessage((e)=>{
      const msg = JSON.parse(e.data);
      if(msg.code==0 && msg.type=='system'){
        Inc.notify(msg.title,msg.content);
        // 刷新消息数
        wx.sendSocketMessage({data:JSON.stringify({type:'newMsg'})});
      }else if(msg.code==0 && msg.type=='newMsg'){
        Inc.storage.setItem('msgNew',msg.num);
        if(msg.num>0) wx.sendSocketMessage({data:JSON.stringify({type:'getMsg'})});
      }else if(msg.code==0 && msg.type=='getMsg'){
        if(msg.title){
          Inc.notify(msg.title,msg.content);
        }
      }
    });
    /* 关闭 */
    wx.onSocketClose(()=>{
      console.log('关闭消息');
      clearInterval(this.msgInterval);
      this.msgInterval = setInterval(()=>{
        this.start();
      },10000);
    });
  }
}