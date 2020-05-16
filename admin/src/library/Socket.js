import Inc from '@/library/Inc'
import Plus from '@/library/Plus'

/* Socket */
export default {

  /* 启动 */
  start(){
    // 重启Socket
    clearInterval(this.msgInterval);
    this.msgInterval = setInterval(()=>{
      if(Inc.self.$store.state.isLogin && (!Inc.self.$store.state.socket || Inc.self.$store.state.socket.readyState!=1)) this.start();
    },3000);
    // Token
    const token = Inc.storage.getItem('token');
    if(!token) return false;
    // 开启
    this.socket(token);
  },

  /* 链接 */
  socket(token){
    Inc.self.$store.state.socket = new WebSocket(Inc.config.socketServer+'?token='+token);
    /* 链接 */
    Inc.self.$store.state.socket.onopen = ()=>{
      console.log('Socket开启');
      // 心跳包
      clearInterval(this.heartbeat);
      this.heartbeat = setInterval(()=>{
        try{
          Inc.self.$store.state.socket.send(JSON.stringify({type:''}));
        }catch(e){
          this._closeMsg();
        }
      },10000);
      // 获取消息组
      setTimeout(()=>{
        Inc.self.$store.state.socket.send(JSON.stringify({type:'group'}));
      },1000);
    }
    /* 关闭 */
    Inc.self.$store.state.socket.onclose = ()=>{
      console.log('Socket关闭');
      this._closeMsg();
    }
    /* 接收 */
    Inc.self.$store.state.socket.onmessage = (res)=>{
      const d = JSON.parse(res.data);
      console.log(d);
      // 是否成功
      if(d.code!=0) return Inc.toast(d.msg);
      /* 消息组 */
      if(d.code==0 && d.type=='group'){
        Inc.self.$store.state.uMsg.group = d.data;
        // 消息数
        this._getMsgNum();
      }
      /* 消息 */
      else if(d.code==0 && d.type=='msg'){
        // 阅读
        const voice = Inc.storage.getItem('voice');
        console.log(voice);
        // Plus.notify(d.data.title,d.data.content,(obj)=>{
        //   obj.close();
        // },voice?true:false);
        // 追加
        const fid = d.data.uid==Inc.self.$store.state.uInfo.uid?d.data.fid:d.data.uid;
        if(Inc.self.$store.state.uMsg.group[''+fid]){
          Inc.self.$store.state.uMsg.group[''+fid].msg.push(d.data);
          // 记录数量
          Inc.self.$store.state.uMsg.group[''+fid].num++;
          Inc.self.$store.state.uMsg.num++;
        }else{
          Inc.self.$store.state.socket.send(JSON.stringify({type:'group'}));
        }
      }
      /* 通知 */
      else if(d.code==0 && d.type=='notify'){
        // console.log(d);
        // console.log(Inc.self.$store.state.uNotify);
      }
    };
  },

  /* 消息数 */
  _getMsgNum(){
    const data = Inc.self.$store.state.uMsg.group;
    let num = 0;
    for(let i in data) num += data[i].num;
    Inc.self.$store.state.uMsg.num = num;
  },
  
  /* 关闭 */
  _closeMsg(){
    if(!Inc.self.$store.state.socket) return;
    Inc.self.$store.state.socket.close();
    Inc.self.$store.state.socket = null;
    Inc.self.$store.state.uMsg.group = [];
    Inc.self.$store.state.uMsg.num = '';
  },

}