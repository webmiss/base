import Env from '../../env.js'

/* Get请求 */
export default (url,data,success,fail)=>{
  // URL
  if(url.substr(0,4)=='http') url=url;
  else if(url.substr(0,1)=='/') url=Env.baseUrl+url.substr(1);
  else url=Env.apiUrl+url;
  wx.request({
    url: url,
    data: data,
    method: 'POST',
    header: Env.request.headers,
    success: success,
    fail: fail,
  });
}