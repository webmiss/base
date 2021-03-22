from base.base import Base
from service.admin_token import AdminToken
from model.user_info import UserInfo as UserInfoM

from flask import request

class UserInfo(Base):

  # 列表
  def List(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    tData = AdminToken.token(token)
    # 查询
    model = UserInfoM()
    model.Columns('nickname', 'name', 'gender', 'birthday', 'position', 'img')
    model.Where('uid=%s', str(tData['uid']))
    list = model.FindFirst()
    list['birthday'] = str(list['birthday']) if list['birthday'] else ''
    print(list)
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'list':list})