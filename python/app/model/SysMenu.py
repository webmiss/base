from app.model.Model import Model
from app.common.Inc import Inc
from app.library.Safety import Safety

# 系统菜单表
class SysMenu(Model):

  id = None
  fid = '0'
  title = ''
  url = ''
  perm = '0'
  ico = ''
  ctime = 'null'
  utime = 'null'
  sort = '0'
  remark = ''

  # 构造函数
  def __init__(self):
    self.setSource('sys_menus')

  # FID
  def setFid(self,val) :
    if not Inc.is_numeric(val) :
      self.error('FID为正整数!')
    self.fid = int(float(val))
  def getFid(self):
    return self.fid

  # 名称
  def setTitle(self,val) :
    num = len(val)
    if num<2 or num>8 :
      self.error('名称为2~8位字符!')
    self.title = val
  def getTitle(self):
    return self.title

  # 控制器
  def setUrl(self,val) :
    if val!='' and not Safety.test(r'^[a-zA-Z]{2,24}$',val) :
      self.error('控制器为2~24位英文!')
    self.action = val
  def getUrl(self):
    return self.action

  # 预设权限
  def setPerm(self,val) :
    if not Inc.is_numeric(val) :
      self.error('权限值为正整数!')
    self.perm = int(float(val))
  def getPerm(self):
    return self.perm

  # 创建
  def beforeCreate(self):
    if self.ctime=='null' : self.ctime=Inc.date('%Y%m%d%H%M%S')

  # 更新
  def beforeUpdate(self):
    if self.utime=='null' : self.utime=Inc.date('%Y%m%d%H%M%S')