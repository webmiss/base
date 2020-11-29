import Env from '@/env'
import Toast from '../library/ui/ui-toast'
import Storage from '../library/ui/storage'
import Notify from '../library/plus/notify'

/* Msg */
export default {

  /* 消息路由 */
  router(socket,d){
    if(d.type=='msg') this.msg(socket,d); //消息
    else if(d.type=='notify') this.notify(socket,d);  //通知
  },

  /* 消息 */
  msg(socket,d){
    // 阅读
    const voice = Storage.getItem('voice');
    Notify(d.data.title,d.data.content,voice?true:false);
  },

  /* 通知 */
  notify(socket,d){
    console.log(socket,d);
  },

}