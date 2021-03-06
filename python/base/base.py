import json
from flask import request

class Base :

  # 返回JSON
  def getJSON(self, data=''):
    return json.dumps(data)

  # 调试信息
  def bug(self,data,next=False):
    print(data)
    if(next==False): self.error('%s'%(data))

  # 异常错误
  def error(self,msg=''):
    print(msg)
    raise Exception(msg)

  # 请求
  def request(self):
    data = None
    if request.method=='POST': data=request.form
    elif request.method=='GET': data=request.args
    return data