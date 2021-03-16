from model.model import Model

# 系统菜单表
class SysMenu(Model) :

  # 构造函数
  def __init__(self):
    super().__init__()
    self.Table('sys_menus')
