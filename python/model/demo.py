from model.model import Model

# 测试表
class Demo(Model) :

  # 构造函数
  def __init__(self):
    super().__init__()
    self.Db('')
    self.Table('test')
