import Env from '@/env'

export default {

  /* 去数组重复 */
  unique(arr){
    let data = [];
    for(let i=0,l=arr.length; i<l; i++) {
      for(var j=i+1; j<l; j++) if (arr[i] === arr[j]) j = ++i;
      data.push(arr[i]);
    }
    return data;
  },

  /* 获取日期 */
  getDay(n,day){
    let now = day?new Date(day):new Date();
    now.setDate(now.getDate()+n);
    let y = now.getFullYear();
    let m = (now.getMonth()+1)<10?'0'+(now.getMonth()+1):(now.getMonth()+1);
    let d = now.getDate()<10?'0'+now.getDate():now.getDate();
    return y+'-'+m+'-'+d;
  },
  /* 获取星期几 */
  getWeek(day){
    let date=new Date(day);
    let week = ['日','一','二','三','四','五','六'];
    return week[date.getDay()];
  },
  /* 年月日时分秒 */
  getDate(){
    const time = new Date();
    const y = time.getFullYear();
    const m = time.getMonth()+1<10?'0'+time.getMonth()+1:time.getMonth()+1;
    const d = time.getDate()<10?'0'+time.getDate():time.getDate();
    const h = time.getHours()<10?'0'+time.getHours():time.getHours();
    const i = time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes();
    const s = time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds();
    return y+'-'+m+'-'+d+' '+h+':'+i+':'+s;
  },

  /* 编辑器 */
  tinymce(){
    return {
      language:'zh_CN',
      language_url : '/tinymce/zh_CN.js',
      skin_url: '/tinymce/skins/ui/oxide',
      height: 550,
      menubar: true,
      branding: false,
      toolbar: 'undo redo | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | table image media preview | removeformat | help',
      toolbar_items_size: 'small',
      plugins: [
        'advlist autolink lists link image charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ]
    }
  },

  /* 加载Css和JS */
  load(files,reload){
    let file = files;
    let ext = '';
    let isLoad = false;
    reload = reload || false;
    for(let i=0; i<file.length;i++){
      isLoad = reload?false:this.isInclude(file[i]);
      ext = file[i].split('.');
      // JS
      if(ext[ext.length-1]=='js'){
        if(!isLoad){
          let box = document.createElement('script');
          box.setAttribute('src',file[i]);
          document.body.appendChild(box);
        }
      // CSS
      }else if(ext[ext.length-1]=='css'){
        if(!isLoad){
          let box = document.createElement('link');
          box.setAttribute('rel','stylesheet');
          box.setAttribute('href',file[i]);
          document.body.appendChild(box);
        }
      }
    }
  },
  
  /* 是否加载Css和JS */
  isInclude(name){
    var js= /js$/i.test(name);
    var es=document.getElementsByTagName(js?'script':'link');
    for(var i=0;i<es.length;i++) 
    if(es[i][js?'src':'href'].indexOf(name)!=-1)return true;
    return false;
},

}