from app.model.Model import Model

# 系统菜单表
class SysMenuAction(Model):

  id = None
  name = ''
  action = ''
  perm = 0
  ico = ''

  # 构造函数
  def __init__(self):
    self.setSource('sys_menus_action')
