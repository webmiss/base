import Env from '@/env'
import axios, { AxiosRequestConfig } from 'axios'

/* Delete请求 */
export default (url: string, data?: any, success?: any, fail?:any ,config?: AxiosRequestConfig)=>{
  const str = url.substr(0,4);
  url = str=='http'?url:Env.apiUrl+url;
  // 配置
  const cfg: AxiosRequestConfig = config || <AxiosRequestConfig>{
    headers: Env.request.headers,
    params: data,
    responseType: Env.request.responseType,
    timeout: Env.request.timeout,
  };
  // 请求
  axios.delete(url,cfg).then(success).catch(fail);
}