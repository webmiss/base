from library.safety import Safety
from service.base import Base
from service.admin_token import AdminToken
from model.user import User
from util.hash import Hash

from flask import request

class UserPasswd(Base):

  # 编辑
  def Edit(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    passwd = self.JsonName(json, 'passwd')
    passwdNew = self.JsonName(json, 'passwdNew')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if passwd==passwdNew :
      return self.GetJSON({'code':4000, 'msg':'不能与原密码相同!'})
    if not Safety.IsRight('passwd', passwd) or not Safety.IsRight('passwd', passwdNew) :
      return self.GetJSON({'code':4000, 'msg':'密码为6～16位!'})
    # 数据
    tData = AdminToken.Token(token)
    model = User()
    model.Columns('id')
    model.Where('id=%s AND password=%s', str(tData['uid']), Hash.Md5(passwd))
    uData = model.FindFirst()
    if not uData : return self.GetJSON({'code':4000, 'msg':'当前密码错误!'})
    model.Set({'password':Hash.Md5(passwdNew)})
    model.Where('id=%s', str(tData['uid']))
    if not model.Update() : return self.GetJSON({'code':5000, 'msg':'修改失败!'})
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功'})
