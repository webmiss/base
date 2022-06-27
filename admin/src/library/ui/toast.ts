/* UI-提示 */
export default (text: string='提示', type: string="primary", time: number = 3000)=>{
  // 创建对象
  let obj: HTMLDivElement = document.createElement('div');
  obj.setAttribute('class','wm-ui_toast');
  obj.innerHTML = '<span class="'+type+'">'+text+'</span>';
  // 追加
  document.body.appendChild(obj);
  // 动画
  setTimeout(()=>{
    obj.style.opacity = '1';
    obj.style.top = '10%';
  },100);
  // 3秒消失
  setTimeout(()=>{
    document.body.removeChild(obj);
  },time);
}