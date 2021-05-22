from json.decoder import JSONDecoder
import requests
from util.util import Util

# 请求
class Curl:

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
