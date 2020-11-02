import time
import datetime

# 数据类
class Data:

  # 自动编号ID-18位
  def getId() :
    d = time.strftime('%Y%m%d%H%M%S',time.localtime())
    t = datetime.datetime.now()
    n = str(t.microsecond)[2:6]
    return d+n