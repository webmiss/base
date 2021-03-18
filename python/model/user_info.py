from model.model import Model

# 用户信息
class UserInfo(Model) :

  # 构造函数
  def __init__(self):
    super().__init__()
    self.Table('user_info')
