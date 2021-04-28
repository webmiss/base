from model.model import Model

# 后台权限表
class SysPerm(Model) :

  # 构造函数
  def __init__(self):
    self.Table('sys_perm')
