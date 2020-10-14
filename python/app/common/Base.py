import json
from flask import make_response,request

class Base :

  # 返回JSON
  def getJSON(self,data=''):
    res = make_response(json.dumps(data))
    res.status = '200'
    res.headers['Access-Control-Allow-Origin'] = "*"
    res.headers['Access-Control-Allow-Methods'] = "*"
    res.headers['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept"
    return res

  # 调试信息
  def bug(self,data,next=False):
    self.getJSON()
    print(data)
    if(next==False): self.error('%s'%(data))

  # 异常错误
  def error(self,msg=''):
    self.getJSON()
    raise Exception(msg)

  # 请求
  def request(self):
    data = None
    if request.method=='POST': data=request.form
    elif request.method=='GET': data=request.args
    return data