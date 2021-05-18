import Toast from '@/library/ui/toast'
import Storage from '@/library/Storage'
import Notify from '@/library/plus/notify'

/* Msg */
export default {

  /* 消息路由 */
  router(socket: any, d: any){
    if(d.type=='msg') this.msg(socket,d); //消息
    else if(d.type=='notify') this.notify(socket,d);  //通知
  },

  /* 消息 */
  msg(socket: any, d: any){
    // 阅读
    const voice = Storage.getItem('voice');
    Notify(d.data.title,d.data.content,voice?true:false);
  },

  /* 通知 */
  notify(socket: any, d: any){
    console.log(socket,d);
  },

}