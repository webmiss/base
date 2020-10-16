from app.common.Base import Base
from app.common.AdminToken import AdminToken

class DesktopController(Base) :

  # 构造函数
  def __init__(self):
    AdminToken().urlVerify('/')

  # 首页
  def index(self):
    return self.getJSON({'code':0,'msg':'成功'})