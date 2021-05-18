
import Toast from '@/library/ui/toast'

/* Plus-Android返回键 */
export default (callback: any)=>{
  try{
    // @ts-ignore
    const webview = plus.webview.currentWebview();
    // @ts-ignore
    plus.key.addEventListener('backbutton', ()=>{
      webview.canBack(callback);
    });
  }catch(e){
    return Toast('Android返回键');
  }
}