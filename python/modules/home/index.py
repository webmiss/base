from service.base import Base

class Index(Base) :

  # 首页
  def Index(self):
    # 返回
    return self.GetJSON({'code':0,'msg':'Web'})