import Env from '@/env'
import axios from 'axios'

export default {

  /* 配置 */
  config: Env,

  /* Get请求 */
  get(url,data,success,fail,config){
    const str = url.substr(0,4);
    url = str=='http'?url:this.config.apiUrl+url;
    // 配置
    let cfg = this.config.request;
    config = config || {};
    for(let i in cfg) config[i] = cfg[i];
    // 请求
    axios.get(url,{params:data},config).then(success).catch(fail);
  },

  /* Post请求 */
  post(url,data,success,fail,config){
    const str = url.substr(0,4);
    url = str=='http'?url:this.config.apiUrl+url;
    // 表单
    let param = new FormData();
    for(let i in data) param.append(i,data[i]);
    // 配置
    let cfg = this.config.request;
    config = config || {};
    for(let i in cfg) config[i] = cfg[i];
    // 请求
    axios.post(url,param,config).then(success).catch(fail);
  },

  /* Put请求 */
  put(url,data,success,fail,config){
    const str = url.substr(0,4);
    url = str=='http'?url:this.config.apiUrl+url;
    // 表单
    let param = new FormData();
    for(let i in data) param.append(i,data[i]);
    // 配置
    let cfg = this.config.request;
    config = config || {};
    for(let i in cfg) config[i] = cfg[i];
    // 请求
    axios.put(url,param,config).then(success).catch(fail);
  },

  /* Delete请求 */
  delete(url,data,success,fail,config){
    const str = url.substr(0,4);
    url = str=='http'?url:this.config.apiUrl+url;
    // 配置
    let cfg = this.config.request;
    config = config || {};
    for(let i in cfg) config[i] = cfg[i];
    // 请求
    axios.delete(url,{params:data},config).then(success).catch(fail);
  },

  /* Request请求 */
  request(url,data,success,fail,config){
    const str = url.substr(0,4);
    url = str=='http'?url:this.config.apiUrl+url;
    // 配置
    let cfg = this.config.request;
    config = config || {};
    for(let i in cfg) config[i] = cfg[i];
    // 请求
    axios.request(url,{params:data},config).then(success).catch(fail);
  },

  /* 本地硬盘 */
  storage: {
    setItem(key,data){ return window.localStorage.setItem(key,data); },
    getItem(key){ return window.localStorage.getItem(key); },
    clear(){ return window.localStorage.clear(); },
  },

}