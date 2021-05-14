import Env from '@/env'
import axios, { AxiosRequestConfig } from 'axios'

/* Post请求 */
export default (url: string, data?: any, success?: any, fail?: any, config?: any)=>{
  // URL
  if(url.substr(0,4)=='http') url=url;
  else if(url.substr(0,1)=='/') url=Env.baseUrl+url.substr(1);
  else url=Env.apiUrl+url;
  // 表单
  let param = new FormData();
  for(let i in data) param.append(i,data[i]);
  // 配置
  const cfg: AxiosRequestConfig = <AxiosRequestConfig>{
    headers: Env.request.headers,
    responseType: Env.request.responseType,
    timeout: Env.request.timeout,
  };
  if(config && config.responseType) cfg.responseType = config.responseType;
  if(config && config.onUploadProgress) cfg.onUploadProgress = config.onUploadProgress;
  // 请求
  axios.post(url,param,cfg).then(success).catch(fail);
}