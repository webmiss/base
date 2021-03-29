from service.base import Base

class Index(Base) :

  # 首页
  def index(self):
    return self.GetJSON({'code':0,'msg':'Api'})