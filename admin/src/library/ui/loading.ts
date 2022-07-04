/* UI-加载 */
export default (time: number = 60000, alpha: number = 0.1)=>{
  // 清理
  let load = document.getElementsByClassName('wm-ui_load')[0];
  if(load) document.body.removeChild(load);
  // 创建对象
  let obj = document.createElement('div');
  obj.setAttribute('class','wm-ui_load');
  obj.setAttribute('style',`background-color: rgba(0,0,0,${alpha})`);
  obj.innerHTML = '<span><i class="ui ui_loading"></i></span>';
  // 追加
  document.body.appendChild(obj);
  // 60秒后清除
  const loadingTime = setTimeout(()=>{
    load = document.getElementsByClassName('wm-ui_load')[0];
    if(load) document.body.removeChild(load);
  },time);
  return {
    clear:()=>{
      setTimeout(()=>{
        try{ document.body.removeChild(obj); }catch(e){}
        clearTimeout(loadingTime);
      },300);
    }
  };
}