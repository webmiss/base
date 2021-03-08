from base.base import Base

class Index(Base) :

  # 首页
  def index(self):
    # 返回
    return self.getJSON({'code':0,'msg':'Web'})