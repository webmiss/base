from app.model.Model import Model
from app.common.Inc import Inc

# 角色表
class UserRole(Model):

  id = None
  role = ''
  ctime = 'null'
  utime = 'null'
  perm = ''

  # 构造函数
  def __init__(self):
    self.setSource('user_role')

  # 创建
  def beforeCreate(self):
    if self.ctime=='null' : self.ctime=Inc.date('%Y%m%d%H%M%S')

  # 更新
  def beforeUpdate(self):
    if self.utime=='null' : self.utime=Inc.date('%Y%m%d%H%M%S')
