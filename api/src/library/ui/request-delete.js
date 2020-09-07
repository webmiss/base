import Env from '@/env'
import axios from 'axios'

/* Delete请求 */
export default (url,data,success,fail,config)=>{
  const str = url.substr(0,4);
  url = str=='http'?url:Env.apiUrl+url;
  // 配置
  let cfg = Env.request;
  config = config || {};
  for(let i in cfg) config[i] = cfg[i];
  // 请求
  axios.delete(url,{params:data},config).then(success).catch(fail);
}