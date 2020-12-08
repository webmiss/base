from app.Env import Env
from app.common.Base import Base
from app.model.SysConfig import SysConfig
from app.library.Socket import Socket

class IndexController(Base) :

  # 首页
  def index(self):
    return self.getJSON({'code':0,'msg':'Admin'})

  # 系统配置
  def getConfig(self):
    # 查询
    model = SysConfig()
    model.where('name in ("title","copy","logo","login_bg")')
    model.columns('name,val')
    config = model.find()
    # 数据
    list = {}
    for val in config :
      if val['name']=='logo' or val['name']=='login_bg' :
        list[val['name']] = Env.base_url+val['val'] if val['val']!='' else ''
      else :
        list[val['name']] = val['val']
    return self.getJSON({'code':0,'list':list,'msg':'成功'})

  # WebSocket
  def socket(self):
    msg = {
      'type': 'msg',
      'uid': '1',
      'data': [],
    }
    Socket().send('admin',msg)
    Socket().sendCli('admin',msg)
    return ''
