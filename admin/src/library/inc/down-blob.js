import Toast from '../ui/ui-toast'
import Post from '../ui/request-post'

/* 下载-Blob */
export default (url,param)=>{
  Post(url,param,(res)=>{
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
}