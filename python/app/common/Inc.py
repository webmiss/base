import time
import hashlib
import json

# 公共类
class Inc:

  # 格式化时间
  def date(format='%Y-%m-%d %H:%M:%S',t=time.localtime()) :
    return time.strftime(format,t)

  # Md5加密
  def md5(str) :
    return hashlib.md5(str.encode(encoding='utf-8')).hexdigest()

  # JSON转字符串
  def json_encode(arr) :
    try :
      return json.dumps(arr)
    except Exception as e :
      return False
  # JSON转数组
  def json_decode(str) :
    try :
      return json.loads(str)
    except Exception as e :
      return False
  
  # 数组格式化字符串
  def implode(glue,arr) :
    return glue.join(arr)
