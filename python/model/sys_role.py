from model.model import Model

# 系统角色表
class SysRole(Model) :

  # 构造函数
  def __init__(self):
    self.Table('sys_role')
