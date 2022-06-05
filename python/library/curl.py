import requests
from util.util import Util
from urllib.parse import urlencode,unquote

# 请求
class Curl:

  # GET、POST、PUT、HEAD、DELETE
  def Request(url: str, data: str='', method: str='GET', header: dict={}, resType: str='json'):
    # 请求头
    param = Util.ArrayMerge({
      'Content-Type': 'application/json; charset=utf-8',  #JSON方式
    }, header)
    # 发送
    if method=='GET' : text = requests.get(url, data=data, headers=param).text
    elif method=='POST' : text = requests.post(url, data=data, headers=param).text
    elif method=='PUT' : text = requests.put(url, data=data, headers=param).text
    elif method=='HEAD' : text = requests.head(url, data=data, headers=param).text
    elif method=='DELETE' : text = requests.delete(url, data=data, headers=param).text
    # 结果
    if resType=='json' : res=Util.JsonDecode(text)
    else: res=text
    return res

  # URL参数-生成
  def UrlEncode(data: dict):
    return urlencode(data)
  # URL参数-解析
  def UrlDecode(data: str):
    res = {}
    arr = data.split('&')
    for v in arr :
      tmp = v.split('=')
      if len(tmp)==2 : res[tmp[0]] = unquote(tmp[1])
    return res

