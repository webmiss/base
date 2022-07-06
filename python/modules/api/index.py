from service.base import Base

class Index(Base) :

  # 首页
  def Index(self):
    return self.GetJSON({'code':0,'msg':'Python Api'})