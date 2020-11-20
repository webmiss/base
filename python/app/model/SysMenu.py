from app.model.Model import Model
from app.common.Inc import Inc

# 系统菜单表
class SysMenu(Model):

  id = None
  fid = 0
  title = ''
  url = ''
  perm = 0
  ico = ''
  ctime = 'null'
  utime = 'null'
  sort = 0
  remark = ''

  # 构造函数
  def __init__(self):
    self.setSource('sys_menus')

  # 创建
  def beforeCreate(self):
    if self.ctime=='null' : self.ctime=Inc.date('%Y%m%d%H%M%S')

  # 更新
  def beforeUpdate(self):
    if self.utime=='null' : self.utime=Inc.date('%Y%m%d%H%M%S')