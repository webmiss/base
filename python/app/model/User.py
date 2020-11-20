from app.model.Model import Model
from app.common.Inc import Inc

# 用户表
class User(Model):

  id = None
  uname = ''
  tel = ''
  email = ''
  password = ''
  rtime = 'null'
  ltime = 'null'
  utime = 'null'
  state = '1'

  # 构造函数
  def __init__(self):
    self.setSource('user')

  # 创建
  def beforeCreate(self):
    if self.rtime=='null' : self.rtime=Inc.date('%Y%m%d%H%M%S')

  # 更新
  def beforeUpdate(self):
    if self.utime=='null' : self.utime=Inc.date('%Y%m%d%H%M%S')