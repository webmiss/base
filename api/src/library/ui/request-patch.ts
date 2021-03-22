import Env from '@/env'
import axios, { AxiosRequestConfig } from 'axios'

/* Patch请求 */
export default (url: string, data?: any, success?: any, fail?: any, config?: any)=>{
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
  if(config && config.responseType) cfg.responseType = config.responseType;
  if(config && config.onUploadProgress) cfg.onUploadProgress = config.onUploadProgress;
  // 请求
  axios.patch(url,param,cfg).then(success).catch(fail);
}