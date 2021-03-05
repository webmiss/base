from base.base import Base

class Index(Base) :

  # 首页
  def index(self):
    return self.getJSON({'code':0,'msg':'Web'})