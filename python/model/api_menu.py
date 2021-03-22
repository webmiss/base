from model.model import Model

# API菜单
class ApiMenu(Model) :

  # 构造函数
  def __init__(self):
    super().__init__()
    self.Table('api_menus')
