import Toast from '@/library/ui/ui-toast'
import Post from '@/library/ui/request-post'

/* 支付 */
export default (pay_type,url,data,callback,fail)=>{
  try{
    // APP支付
    if(pay_type=='alipay') data['type']='app';
    else if(pay_type=='wxpay') data['type']='APP';
    // 支付频道
    plus.payment.getChannels((channels)=>{
      let channel = null;
      for(let i in channels){
        if(channels[i].id==pay_type) channel=channels[i];
      }
      // 支付参数
      Post(url,data,(res)=>{
        const d = res.data;
        if(d.code!=0) return Toast(d.msg);
        // 唤起支付
        plus.payment.request(channel,d.data,callback,fail);
      });
    },(e)=>{
      return Toast('支付通道:'+e.message);
    });
  }catch(e){
    return Toast('H5方式:'+pay_type);
  }
}