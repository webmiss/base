from model.model import Model

# 用户表
class User(Model) :

  # 构造函数
  def __init__(self):
    self.Table('user')
