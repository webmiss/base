from app.model.Model import Model
from app.common.Inc import Inc

# 系统配置表
class SysConfig(Model):

  id = None
  title = ''
  name = ''
  val = ''
  ctime = 'null'
  utime = 'null'

  # 构造函数
  def __init__(self):
    self.setSource('sys_config')

  # 创建
  def beforeCreate(self):
    if self.ctime=='null' : self.ctime=Inc.date('%Y%m%d%H%M%S')

  # 更新
  def beforeUpdate(self):
    if self.utime=='null' : self.utime=Inc.date('%Y%m%d%H%M%S')
