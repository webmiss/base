import Env from '@/env'
import axios, { AxiosRequestConfig } from 'axios'

/* Get请求 */
export default (url: string, data?: any, success?: any, fail?: any, config?: any)=>{
  const str = url.substr(0,4);
  url = str=='http'?url:Env.apiUrl+url;
  // 配置
  const cfg: AxiosRequestConfig = config || <AxiosRequestConfig>{
    headers: Env.request.headers,
    params: data,
    responseType: Env.request.responseType,
    timeout: Env.request.timeout,
  };
  if(config && config.responseType) cfg.responseType = config.responseType;
  if(config && config.onUploadProgress) cfg.onUploadProgress = config.onUploadProgress;
  // 请求
  axios.get(url,cfg).then(success).catch(fail);
}