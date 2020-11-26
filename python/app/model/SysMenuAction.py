from app.model.Model import Model
from app.library.Safety import Safety

# 系统菜单表
class SysMenuAction(Model):

  id = None
  name = ''
  action = ''
  perm = '0'
  ico = ''

  # 构造函数
  def __init__(self):
    self.setSource('sys_menus_action')

  # 名称
  def setName(self,val) :
    num = len(val)
    if num<2 or num>6 :
      self.error('名称为2~6位字符!')
    self.name = val
  def getName(self):
    return self.name

  # 命名
  def setAction(self,val) :
    if not Safety.test(r'^[a-zA-Z]{2,16}$',val) :
      self.error('命名为2~16位英文!')
    self.action = val
  def getAction(self):
    return self.action

  # 权限
  def setPerm(self,val) :
    if val=='' or int(val)<2 or int(val)%2!=0 :
      self.error('权限为2的n次方!')
    self.perm = val
  def getPerm(self):
    return self.perm
