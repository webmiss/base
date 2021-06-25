import Env from '@/env'
import axios, { AxiosRequestConfig } from 'axios'

/* Delete请求 */
export default (url: string, data?: any, success?: any, fail?: any, config?: any)=>{
  // URL
  if(url.substr(0,4)=='http') url=url;
  else if(url.substr(0,1)=='/') url=Env.baseUrl+url.substr(1);
  else url=Env.apiUrl+url;
  // 配置
  const cfg: AxiosRequestConfig = <AxiosRequestConfig>{
    headers: config&&config.headers?config.headers:Env.request.headers,
    params: data,
    responseType: config&&config.responseType?config.responseType:Env.request.responseType,
    timeout: Env.request.timeout,
  };
  // 请求
  axios.delete(url,cfg).then(success).catch(fail);
}