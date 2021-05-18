import Toast from '../ui/toast'
import Post from '../request/post'

/* Blob */
export default (url: string, param: any)=>{
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
}