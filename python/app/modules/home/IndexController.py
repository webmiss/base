from app.common.Base import Base

class IndexController(Base) :

  # 首页
  def index(self):
    return self.getJSON({'code':0,'msg':'Web'})