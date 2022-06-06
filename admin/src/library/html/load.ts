/* 是否存在 */
const _isInclude = (name: string, type: string='')=>{
  let js: boolean = type=='js' || /js$/i.test(name);
  const es=document.getElementsByTagName(js?'script':'link');
  for(let val of es){
    let url: string = js?'src':'href';
    if((val as any)[url].indexOf(name)!=-1) return true;
  }
  return false;
}

/* 加载Css和JS */
export default (files: Array<string>, reload: boolean=false, type: string='')=>{
  let ext: string[] = [];
  let isLoad = false;
  for(let file of files){
    // 是否存在
    isLoad = _isInclude(file,type);
    if(reload) isLoad=false;
    ext = file.split('.');
    // JS
    if(ext[ext.length-1]=='js' || type=='js'){
      if(!isLoad){
        let box = document.createElement('script');
        box.setAttribute('src',file);
        document.body.appendChild(box);
      }
    // CSS
    }else if(ext[ext.length-1]=='css' || type=='css'){
      if(!isLoad){
        let box = document.createElement('link');
        box.setAttribute('rel','stylesheet');
        box.setAttribute('href',file);
        document.body.appendChild(box);
      }
    }
  }
}