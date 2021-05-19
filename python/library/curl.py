from json.decoder import JSONDecoder
import requests
from util.util import Util

# 请求
class Curl:

  # PostJson
  def PostJson(url: str, data: dict):
    json = Util.JsonEncode(data) if len(data)>0 else '{}'
    headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    res = requests.post(url, data=json, headers=headers).text
    return Util.JsonDecode(res) if len(res)>0 else None
