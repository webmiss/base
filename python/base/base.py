import json
from flask import request

class Base :

  # 返回JSON
  def GetJSON(self, data=''):
    return json.dumps(data)

  # Get参数
  def Get(self, name: str):
    return request.args.get(name)

  # Post参数
  def Post(self, name: str):
    val = request.form.get(name)
    return val if val else ''

  # 输出到控制台
  def Print(self, *content) :
    print(*content)

  # 异常错误
  def Error(self, msg: str =''):
    print(msg)
    raise Exception(msg)

  # 请求
  def request(self):
    data = None
    if request.method=='POST': data=request.form
    elif request.method=='GET': data=request.args
    return data