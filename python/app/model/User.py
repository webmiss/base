from app.model.Model import Model
from app.common.Inc import Inc
from app.library.Safety import Safety

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

  # 用户名
  def setUname(self,val) :
    if val!='' :
      if not Safety.isRight('uname',val) : self.error('用户名英文开头4～16位!')
    self.uname = val
  def getUname(self) :
    return self.uname

  # 手机
  def setTel(self,val) :
    if val!='' :
      if not Safety.isRight('tel',val) : self.error('手机号码有误!')
    self.tel = val
  def getTel(self) :
    return self.tel

  # 邮箱
  def setEmail(self,val) :
    if val!='' :
      if not Safety.isRight('email',val) : self.error('邮箱有误!')
    self.email = val
  def getEmail(self) :
    return self.email

  # 密码
  def setPassword(self,val) :
    if val=='' :
      val = Inc.md5('123456')
    self.password = val
  def getPassword(self) :
    return self.password

  # 创建
  def beforeCreate(self):
    if self.rtime=='null' : self.rtime=Inc.date('%Y%m%d%H%M%S')

  # 更新
  def beforeUpdate(self):
    if self.utime=='null' : self.utime=Inc.date('%Y%m%d%H%M%S')