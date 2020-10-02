from app.controller.Base import Base

class Index(Base) :

  # 首页
  def index(self):
    return self.getJSON({'code':0,'msg':'Api'})