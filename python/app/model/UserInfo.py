from app.model.Model import Model
from app.common.Inc import Inc

# 用户信息表
class UserInfo(Model):

  uid = '0'
  utime = 'null'
  nickname = ''
  position = ''
  name = ''
  gender = ''
  birthday = 'null'
  img = ''
  
  # 构造函数
  def __init__(self):
    self.setPrimaryKey('uid')
    self.setSource('user_info')

  # 生日
  def setBirthday(self,val) :
    if val=='' :
      val == 'null'
    self.birthday = int(float(val))
  def getBirthday(self):
    return self.birthday

  # 更新
  def beforeUpdate(self):
    if self.utime=='null' : self.utime=Inc.date('%Y%m%d%H%M%S')
