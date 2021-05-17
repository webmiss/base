from library.safety import Safety
from service.base import Base
from service.admin_token import AdminToken
from model.user import User
from util.util import Util
from util.hmac import Hmac

from flask import request

class UserPasswd(Base):

  # 编辑
  def Edit(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken.Verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    tData = AdminToken.Token(token)
    # 参数
    passwd = self.Post('passwd')
    passwdNew = self.Post('passwdNew')
    if passwd==passwdNew : return self.GetJSON({'code':4000, 'msg':'不能与原密码相同!'})
    if not Safety.IsRight('passwd', passwd) or not Safety.IsRight('passwd', passwdNew) :
      return self.GetJSON({'code':4000, 'msg':'密码为6～16位!'})
    # 数据
    model = User()
    model.Columns('id')
    model.Where('id=%s AND password=%s', str(tData['uid']), Hmac.Md5(passwd))
    uData = model.FindFirst()
    if not uData : return self.GetJSON({'code':4000, 'msg':'当前密码错误!'})
    model.Set({'password':Hmac.Md5(passwdNew)})
    model.Where('id=%s', str(tData['uid']))
    if not model.Update() : return self.GetJSON({'code':5000, 'msg':'修改失败!'})
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功'})
