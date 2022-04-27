import requests
from util.util import Util

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
