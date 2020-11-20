from app.model.Model import Model
from app.common.Inc import Inc

# 权限表
class UserPerm(Model):

  uid = '0'
  state_admin = '0'
  state_app = '0'
  utime = 'null'
  role = ''
  perm = ''

  # 构造函数
  def __init__(self):
    self.setPrimaryKey('uid')
    self.setSource('user_perm')

  # 更新
  def beforeUpdate(self):
    if self.utime=='null' : self.utime=Inc.date('%Y%m%d%H%M%S')
