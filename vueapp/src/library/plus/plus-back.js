import Toast from '@/library/ui/ui-toast'

/* Plus-Android返回键 */
export default (callback)=>{
  try{
    const webview = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', ()=>{
      webview.canBack(callback);
    });
  }catch(e){
    return Toast('Android返回键');
  }
}