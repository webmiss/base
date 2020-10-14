from flask import request
from app.common.Base import Base
from app.library.Safety import Safety

class ApiToken(Base):

  # 验证&数据
  def verify(self):
    # 获取Token
    data = None
    if request.method=='POST': data=request.form
    elif request.method=='GET': data=request.args
    token = data.get('token')
    # 验证Token
    res = Safety().decode(token)
    if res==None : self.error('Token验证失败!')
    return res
