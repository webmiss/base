import hashlib
import time

class Util:

  # Md5加密
  def md5(str: str):
    return hashlib.md5(str.encode(encoding='utf-8')).hexdigest()

  # 格式化时间
  def date(format: str = '%Y-%m-%d %H:%M:%S', t: str = None):
    t = time.localtime(t)
    return time.strftime(format,t)

  # String to List
  def explode(delimiter: str, string: str):
    return string.split(delimiter)

  # List to String
  def implode(glue: str, pieces: list):
    return glue.join(pieces)