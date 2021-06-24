import json, os
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

  # Json参数
  def Json(self):
    return request.json if request.method == "POST" else request.args
  def JsonName(self, param: dict, name: str):
    return param[name] if name in param.keys() else None

  # 输出到控制台
  def Print(self, *content) :
    print(*content)

  # 异常错误
  def Error(self, msg: str =''):
    print(msg)
    raise Exception(msg)
