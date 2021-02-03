import Env from '@/env'
import axios, { AxiosRequestConfig } from 'axios'

/* Put请求 */
export default (url: string, data?: any, success?: any, fail?:any ,config?: AxiosRequestConfig)=>{
  const str = url.substr(0,4);
  url = str=='http'?url:Env.apiUrl+url;
  // 表单
  let param = new FormData();
  for(let i in data) param.append(i,data[i]);
  // 配置
  const cfg: AxiosRequestConfig = config || <AxiosRequestConfig>{
    headers: Env.request.headers,
    responseType: Env.request.responseType,
    timeout: Env.request.timeout,
  };
  // 请求
  axios.put(url,param,cfg).then(success).catch(fail);
}