
export default {

  /* Vue */
  self: null,

  /* 轻提示 */
  toast(text){
    // 创建对象
    let obj = document.createElement('div');
    obj.setAttribute('class','wm-ui_toast');
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

  /* 加载CSS */
  requireCss(href){
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    head.appendChild(link);
  },

  /* 保存图片 */
  downImg(url,name,ext){
    let timestamp = name || Date.parse(new Date())/1000;
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

}