import Toast from '../ui/ui-toast'
import Post from '../ui/request-post'

/* 下载 */
export default {

  /* File */
  file(url: string, name?: string, ext?: string) {
    let now: string = (new Date()).toString();
    const timestamp = name || Date.parse(now)/1000;
    ext = ext || 'png';
    // 创建对象
    let a = document.createElement('a');
    a.href = url;
    a.download = timestamp+'.'+ext;
    document.body.appendChild(a);
    // 点击
    a.click();
    // 移除
    document.body.removeChild(a);
  },

  /* Blob */
  blob(url: string, param: any) {
    Post(url,param,(res: any)=>{
      const blob = new Blob([res.data]);
      const a = document.createElement('a');
      const href = window.URL.createObjectURL(blob);
      a.href = href;
      a.download = param.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(href);
    },()=>{
      Toast('网络加载错误!');
    },{
      responseType:'blob',
    });
  },

}