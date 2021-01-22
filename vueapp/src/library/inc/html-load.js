/* 是否存在 */
const _isInclude = (name,type)=>{
  let js= type=='js' || /js$/i.test(name);
  const es=document.getElementsByTagName(js?'script':'link');
  for(var i=0;i<es.length;i++) 
  if(es[i][js?'src':'href'].indexOf(name)!=-1) return true;
  return false;
}

/* 加载Css和JS */
export default (files,type,reload)=>{
  let ext = '';
  let isLoad = false;
  reload = reload || false;
  for(let i=0; i<files.length;i++){
    isLoad = _isInclude(files[i],type);
    if(isLoad && reload) isLoad=true;
    ext = files[i].split('.');
    // JS
    if(ext[ext.length-1]=='js' || type=='js'){
      if(!isLoad){
        let box = document.createElement('script');
        box.setAttribute('src',files[i]);
        document.body.appendChild(box);
      }
    // CSS
    }else if(ext[ext.length-1]=='css' || type=='css'){
      if(!isLoad){
        let box = document.createElement('link');
        box.setAttribute('rel','stylesheet');
        box.setAttribute('href',files[i]);
        document.body.appendChild(box);
      }
    }
  }
}