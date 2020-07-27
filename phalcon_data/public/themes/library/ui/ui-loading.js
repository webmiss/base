/* UI-加载 */
export default (time)=>{
  // 清理
  let load = document.getElementsByClassName('wm-ui_load')[0];
  if(load) document.body.removeChild(load);
  // 创建对象
  let obj = document.createElement('div');
  obj.setAttribute('class','wm-ui_load');
  obj.innerHTML = '<span><i class="ui ui_loading"></i></span>';
  // 追加
  document.body.appendChild(obj);
  // 10秒后清除
  time = time || 10000;
  const loadingTime = setTimeout(()=>{
    load = document.getElementsByClassName('wm-ui_load')[0];
    if(load) document.body.removeChild(load);
  },time);
  return {
    clear:()=>{
      document.body.removeChild(obj);
      clearTimeout(loadingTime);
    }
  };
}