import Env from '../../env.js'
import axios from 'axios'

/* Get请求 */
export default (url,data,success,fail,config)=>{
  const str = url.substr(0,4);
  url = str=='http'?url:Env.apiUrl+url;
  // 配置
  let cfg = Env.request;
  config = config || {};
  for(let i in cfg) config[i] = cfg[i];
  // 请求
  axios.get(url,{params:data},config).then(success).catch(fail);
}