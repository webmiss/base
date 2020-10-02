import json
from flask import make_response

class Base :

  # 返回JSON
  def getJSON(self,data):
    res = make_response(json.dumps(data))
    res.status = '200'
    res.headers['Access-Control-Allow-Origin'] = "*"
    res.headers['Access-Control-Allow-Methods'] = "*"
    res.headers['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept"
    return res

  # 调试信息
  def bug(self,data,next=False):
    self.getJSON({})
    print(data)
    if(next==False): self.error('Bug')

  # 异常错误
  def error(self,code=''):
    raise Exception(code)
