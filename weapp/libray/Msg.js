import Storage from './ui/storage'

/* Msg */
export default {

  self: null,

  /* 消息路由 */
  router(self,d){
    this.self = self;
    if(d.type=='group') this.msgGroup(d); //消息组
    else if(d.type=='msg') this.msg(d); //消息
    else if(d.type=='notify') this.msgNotify(d); //通知
  },

  /* 消息组 */
  msgGroup(d){
    this.self.store.data.uMsg.group = d.data;
    // 消息数
    const data = this.self.store.data.uMsg.group;
    let num = 0;
    for(let i in data) num += data[i].num;
    this.self.store.data.uMsg.num = num;
    this.self.update();
  },

  /* 消息 */
  msg(d){
    // 追加
    const fid = d.data.uid==this.self.store.data.uInfo.uid?d.data.fid:d.data.uid;
    if(this.self.store.data.uMsg.group[''+fid]){
      this.self.store.data.uMsg.group[''+fid].msg.push(d.data);
      // 记录数量
      this.self.store.data.uMsg.group[''+fid].num++;
      this.self.store.data.uMsg.num++;
    }else{
      this.self.store.data.socket.send(JSON.stringify({type:'group'}));
    }
  },

  /* 通知 */
  msgNotify(d){
    console.log(d);
  },

}