from base.base import Base
from model.user import User

class Index(Base) :

  # 首页
  def index(self):
    # 查询
    demo = User()
    demo.Find()
    return self.getJSON({'code':0,'msg':'Web'})