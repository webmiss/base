from base.base import Base
from config.env import Env
from model.sys_config import SysConfig

class Index(Base):

  # 首页
  def index(self):
    return self.GetJSON({'code':0,'msg':'Admin'})

  # 系统配置
  def getConfig(self):
    config = SysConfig()
    config.Columns('name','val')
    config.Where('name in ("title","copy","logo","login_bg")')
    data = config.Find()
    # 关闭
    config.Close()
    # 数据
    list = {}
    for val in data :
      if val['name']=='logo' or val['name']=='login_bg' :
        list[val['name']] = Env.base_url+val['val'] if val['val']!='' else ''
      else :
        list[val['name']] = val['val']
    return self.GetJSON({'code':0,'msg':'成功', 'list':list})