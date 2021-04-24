from model.model import Model

# API权限
class ApiPerm(Model) :

  # 构造函数
  def __init__(self):
    self.Table('api_perm')
