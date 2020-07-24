/* UI-提示 */
export default (text,time)=>{
  // 创建对象
  let obj = document.createElement('div');
  obj.setAttribute('class','wm-ui_toast');
  obj.innerHTML = '<span>'+text+'</span>';
  // 追加
  document.body.appendChild(obj);
  // 动画
  setTimeout(()=>{
    obj.style.opacity = '1';
    obj.style.top = '10%';
  },100);
  // 3秒消失
  time = time || 3000;
  setTimeout(()=>{
    document.body.removeChild(obj);
  },time);
}