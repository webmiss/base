from base.base import Base
from service.api_token import ApiToken

from flask import request

class Demo(Base) :

  # 验证Token
  def Token(self):
    # 验证
    token = self.Post('token')
    msg = ApiToken().verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 返回
    return self.GetJSON({'code':0,'msg':'验证成功'})

  # 验证Url
  def List(self):
    # 验证
    token = self.Post('token')
    msg = ApiToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 返回
    return self.GetJSON({'code':0,'msg':'验证成功'})

  # 验证Url
  def Perm(self):
    # 验证
    token = self.Post('token')
    msg = ApiToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 返回
    return self.GetJSON({'code':0,'msg':'验证成功'})