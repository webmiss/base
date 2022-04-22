from json.decoder import JSONDecoder
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

  # PostJson
  def PostJson(url: str, data: dict, header: dict={}):
    # 请求头
    param = Util.ArrayMerge({
      'Content-Type': 'application/json; charset=utf-8',  #JSON方式
    }, header)
    # 数据
    json = Util.JsonEncode(data) if len(data)>0 else '{}'
    # 发送
    res = requests.post(url, data=json, headers=param).text
    return Util.JsonDecode(res) if len(res)>0 else None
