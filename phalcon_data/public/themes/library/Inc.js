
export default {

  /* Vue */
  self: null,

  toast(text){
    // 创建对象
    let obj = document.createElement('div');
    obj.setAttribute('class','ui_toast');
    obj.innerHTML = '<span>'+text+'</span>';
    // 追加
    document.body.appendChild(obj);
    // 动画
    setTimeout(()=>{
      obj.style.opacity = '1';
      obj.style.top = '15%';
    },100);
    // 3秒消失
    setTimeout(()=>{
      document.body.removeChild(obj);
    },3000);
  },

}