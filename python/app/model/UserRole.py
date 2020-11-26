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

  # 名称
  def setRole(self,val) :
    num = len(val)
    if num<2 or num>16 :
      self.error('名称为2~16位字符!')
    self.role = val
  def getRole(self):
    return self.role

  # 创建
  def beforeCreate(self):
    if self.ctime=='null' : self.ctime=Inc.date('%Y%m%d%H%M%S')

  # 更新
  def beforeUpdate(self):
    if self.utime=='null' : self.utime=Inc.date('%Y%m%d%H%M%S')
