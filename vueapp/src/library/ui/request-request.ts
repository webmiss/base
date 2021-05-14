import Env from '@/env'
import axios, { AxiosRequestConfig } from 'axios'

/* Delete请求 */
export default (url: string, data?: any, success?: any, fail?: any, config?: any)=>{
  // URL
  if(url.substr(0,4)=='http') url=url;
  else if(url.substr(0,1)=='/') url=Env.baseUrl+url.substr(1);
  else url=Env.apiUrl+url;
  // 配置
  const cfg: AxiosRequestConfig = config || <AxiosRequestConfig>{
    url: url,
    headers: Env.request.headers,
    params: data,
    responseType: Env.request.responseType,
    timeout: Env.request.timeout,
  };
  if(config && config.responseType) cfg.responseType = config.responseType;
  if(config && config.onUploadProgress) cfg.onUploadProgress = config.onUploadProgress;
  // 请求
  axios.request(cfg).then(success).catch(fail);
}