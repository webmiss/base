from app.model.Model import Model
from app.common.Inc import Inc

# Demo
class Demo(Model):

  uid = 0
  title = ''
  ctime = 'null'
  utime = 'null'

  # 构造函数
  def __init__(self):
    self.setPrimaryKey('uid')
    self.setSource('test')

  # 标题
  def setTitle(self,val):
    self.title = val
  def getTitle(self):
    return self.title

  # 创建
  def beforeCreate(self):
    if self.ctime=='null' : self.ctime=Inc.date('%Y%m%d%H%M%S')

  # 更新
  def beforeUpdate(self):
    if self.utime=='null' : self.utime=Inc.date('%Y%m%d%H%M%S')

  # 删除
  def beforeDelete(self):
    pass
