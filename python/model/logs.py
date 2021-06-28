from model.model import Model

# 访问日志
class Logs(Model) :

  # 构造函数
  def __init__(self):
    self.Table('logs')
