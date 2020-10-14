import time
import hashlib

# 公共函数
class Inc:

  # 格式化时间
  def date(format='%Y-%m-%d %H:%M:%S',t=time.localtime()) :
    return time.strftime(format,t)

  # Md5加密
  def md5(str) :
    return hashlib.md5(str.encode(encoding='utf-8')).hexdigest()