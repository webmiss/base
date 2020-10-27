from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.common.Inc import Inc
from app.library.Safety import Safety
from app.model.User import User

class UserpasswdController(Base) :

  tokenData = None

  # 构造函数
  def __init__(self):
    self.tokenData = AdminToken().urlVerify('UserPasswd')

  # 修改密码
  def edit(self):
    req = self.request()
    passwd = req.get('passwd')
    passwd1 = req.get('passwd1')
    # 验证
    if passwd==passwd1 :
      return self.getJSON({'code':4000,'msg':'不能与原密码相同!'})
    if not Safety.isRight('passwd',passwd) or not Safety.isRight('passwd',passwd1) :
      return self.getJSON({'code':4000,'msg':'密码格式错误!'})
    # 用户信息
    info = User().findFirst({
      'where': 'id=%s AND password="%s"'%(self.tokenData['uid'],Inc.md5(passwd)),
      'columns': 'id',
    })
    if not info :
      return self.getJSON({'code':4000,'msg':'当前密码错误!'})
    # 保存
    res = User().update({'password':Inc.md5(passwd1)},'id=%s'%(self.tokenData['uid']))
    if res :
      return self.getJSON({'code':0,'msg':'成功'})
    else :
      return self.getJSON({'code':5000,'msg':'修改失败!'})