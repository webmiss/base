import Inc from '@/library/Inc'
/* Socket */
export default {

  /* 启动 */
  start(){
    // 重启Socket
    clearInterval(this.msgInterval);
    this.msgInterval = setInterval(()=>{
      if(Inc.vue.$store.state.isLogin && (!Inc.vue.$store.state.socket || Inc.vue.$store.state.socket.readyState!=1)) this.start();
    },3000);
    // Token
    const token = Inc.storage.getItem('token');
    if(!token) return false;
    // 开启
    this.socket(token);
  },

  /* 链接 */
  socket(token){
    Inc.vue.$store.state.socket = new WebSocket(Inc.config.socketServer+'?token='+token);
    /* 链接 */
    Inc.vue.$store.state.socket.onopen = ()=>{
      console.log('SocketOpen');
      // 心跳包
      clearInterval(this.heartbeat);
      this.heartbeat = setInterval(()=>{
        try{
          Inc.vue.$store.state.socket.send(JSON.stringify({type:''}));
        }catch(e){
          this.closeMsg();
        }
      },10000);
      // 获取消息组
      setTimeout(()=>{
        Inc.vue.$store.state.socket.send(JSON.stringify({type:'group'}));
        Inc.vue.$store.state.socket.send(JSON.stringify({type:'msg',data:{uid:'123',fid:'1'}}));
      },1000);
    }
    /* 关闭 */
    Inc.vue.$store.state.socket.onclose = ()=>{
      console.log('SocketEnd');
      this.closeMsg();
    }
    /* 接收 */
    Inc.vue.$store.state.socket.onmessage = (e)=>{
      const msg = JSON.parse(e.data);
      console.log(msg);
    };
  },

  /* 消息数 */
  getMsgNum(){
    const data = Inc.vue.$store.state.uMsg.group;
    let num = 0;
    for(let i in data) num += data[i].num;
    Inc.vue.$store.state.uMsg.num = num;
  },
  /* 关闭 */
  closeMsg(){
    if(!Inc.vue.$store.state.socket) return;
    Inc.vue.$store.state.socket.close();
    Inc.vue.$store.state.socket = null;
    Inc.vue.$store.state.uMsg.group = [];
    Inc.vue.$store.state.uMsg.num = '';
  },

}