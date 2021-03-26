import hashlib
import time
import json

# 常用工具
class Util:

  # Md5加密
  def Md5(str: str):
    return hashlib.md5(str.encode(encoding='utf-8')).hexdigest()

  # 格式化时间
  def Date(format: str = '%Y-%m-%d %H:%M:%S', timestamp: float = None):
    t = time.localtime(timestamp)
    return time.strftime(format, t)

  # 时间戳
  def Time():
    return int(time.time())

  # String To Timestamp
  def Strtotime(day: str=None, format: str='%Y-%m-%d %H:%M:%S'):
    tArr = time.strptime(day, format)
    return time.mktime(tArr)

  # 去首尾空格
  def Trim(str: str, charlist: str = None):
    return str.strip(charlist)

  # String to List
  def Explode(delimiter: str, string: str):
    return string.split(delimiter)

  # List to String
  def Implode(glue: str, pieces: list):
    return glue.join(pieces)

  # Array to String
  def JsonEncode(arr):
    try :
      return json.dumps(arr)
    except Exception as e :
      return ''

  # String to Array
  def JsonDecode(str: str):
    try :
      return json.loads(str)
    except Exception as e :
      return []

  # 合并数组
  def ArrayMerge(*arrays: dict):
    res = {}
    for arr in arrays :
      for k,v in arr.items() : res[k] = v
    return res

