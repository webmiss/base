import Env from '@/env'
import Toast from '@/library/ui/ui-toast'

/* 分享 */
export default (parm)=>{
  try{
    // 朋友圈、我的好友
    const scene = parm.scene?'WXSceneSession':'WXSceneTimeline';
    // 数据
    let share = {};
    if(parm.id=='weixin'){
      // 小程序
      if(parm.type=='wx' && scene=='WXSceneSession'){
        share = {
          type: 'miniProgram',
          title: parm.title,
          content: parm.content,
          thumbs: parm.img,
          miniProgram:{
            id: Env.wx_id,
            path: parm.wx || 'pages/index/index',
            type: Env.wx_type,
            webUrl: parm.url
          },
          extra:{scene:scene}
        };
      }else{
        // 网页
        share = {
          type:'web',
          title:parm.title,
          content:parm.content,
          thumbs:parm.img,
          href:parm.url,
          extra:{scene:scene}
        };
      }
    }else if(parm.id=='qq'){
      share = {type:'text',title:parm.title,content:parm.content,thumbs:parm.img,href:parm.url};
    }else if(parm.id=='sinaweibo'){
      share = {type:'web',content:parm.content,href:parm.url};
    }
    // 提交
    let service = null;
    plus.share.getServices((s)=>{
      // 服务
      for(let i in s) if(s[i].id == parm.id) service = s[i];
      // 发送
      service.send(share,()=>{
        return Toast('分享成功!');
      },(e)=>{
        return Toast('分享失败!');
      });
    },(e)=>{
      return Toast('分享错误!');
    });
  }catch(e){
    return Toast('请在APP内使用!');
  }
}