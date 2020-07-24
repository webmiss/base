import Env from '@/env'
import axios from 'axios'

/* Put请求 */
export default (url,data,success,fail,config)=>{
  const str = url.substr(0,4);
  url = str=='http'?url:Env.apiUrl+url;
  // 表单
  let param = new FormData();
  for(let i in data) param.append(i,data[i]);
  // 配置
  let cfg = Env.request;
  config = config || {};
  for(let i in cfg) config[i] = cfg[i];
  // 请求
  axios.put(url,param,config).then(success).catch(fail);
}