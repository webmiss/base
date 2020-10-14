from app.common.Base import Base
from app.model.SysConfig import SysConfig
from app.Env import Env

class IndexController(Base) :

  # 首页
  def index(self):
    return self.getJSON({'code':0,'msg':'Admin'})

  # 系统配置
  def getConfig(self):
    config = SysConfig().find({'columns':'name,title,val'})
    arr = ['title','copy','logo','login_bg']
    list = {}
    for val in config :
      if val['name'] in arr :
        list[val['name']] = val['val']
        if val['name']=='logo' or val['name']=='login_bg' :
          list[val['name']] = Env.base_url+val['val'] if val['val']!='' else ''
    return self.getJSON({'code':0,'list':list,'msg':'成功'})