import modal from './notify.vue'

/* 消息插件 */
let notify={};
notify.install = function(Vue){

  /* 动画 */
  const start = (elem)=>{
    elem.style.transition = 'all .3s ease';
    elem.style.transform = 'translate(0, 0)';
    elem.style.opacity = '1';
  }
  const leave = (elem,box)=>{
    elem.style.transition = 'all .3s ease';
    elem.style.transform = 'translate(0, -100%)';
    elem.style.opacity = '0';
    setTimeout(()=>{
      box.removeChild(elem);
    },300);
  }

  /* 消息 */
  Vue.prototype.$msgNotify = (options)=>{
    // 模块
    let v = Vue.extend(modal);
    let vm = new v;
    // 容器
    let html = document.createElement('div');
    vm.$mount(html);
    // 赋值
    vm.title = options.title || '标题';
    vm.content = options.content || '';
    vm.color = options.color || '#333';
    vm.bgColor = options.bgColor || 'rgba(255,255,255,.9)';
    options.delay = options.delay || 5000;
    options.onClick = options.onClick || function(){};
    // 追加
    let box = document.getElementById('notifyBody');
    if(!box){
      box = document.createElement('div');
      box.setAttribute('id','notifyBody');
      box.setAttribute('style','position: fixed; z-index: 9999; width: 100%; max-width: 360px; top: 10px; left: 0; right: 0; margin: auto;');
    }
    document.body.appendChild(box);
    box.appendChild(vm.$el);
    setTimeout(()=>{
      start(vm.$el);
    },300);
    // 自动关闭
    vm.$el.stime = setTimeout(()=>{
      leave(vm.$el,box);
    },options.delay);
    // 事项
    vm.$el.onclick = function(){
      options.onClick(this);
    };
    // 点击关闭
    vm.$el.close = function(){
      clearTimeout(vm.$el.stime);
      leave(vm.$el,box);
    }
    
  }

  


}
export default notify;