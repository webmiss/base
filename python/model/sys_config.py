from model.model import Model

# 测试表
class SysConfig(Model) :

  # 构造函数
  def __init__(self):
    self.Db('')
    self.Table('sys_config')
