import hashlib
import time
import json

# 常用工具
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

  # Array to String
  def json_encode(arr):
    try :
      return json.dumps(arr)
    except Exception as e :
      return ''

  # String to Array
  def json_decode(str: str):
    try :
      return json.loads(str)
    except Exception as e :
      return []
