/* 是否存在 */
const _isInclude = (name)=>{
  let js= /js$/i.test(name);
  const es=document.getElementsByTagName(js?'script':'link');
  for(var i=0;i<es.length;i++) 
  if(es[i][js?'src':'href'].indexOf(name)!=-1)return true;
  return false;
}

/* 加载Css和JS */
export default (files,reload)=>{
  let file = files;
  let ext = '';
  let isLoad = false;
  reload = reload || false;
  for(let i=0; i<file.length;i++){
    isLoad = reload?false:_isInclude(file[i]);
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
}