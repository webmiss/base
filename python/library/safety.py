import re
import jwt
from config.env import Env

# 安全验证类
class Safety:

  # 正则-公共
  def IsRight(name: str, val: any):
    data = {
      'uname':r'^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{3,15}$',
      'passwd':r'^[a-zA-Z0-9|_|@|-|*|&]{6,16}$',
      'tel':r'^1\d{10}$',
      'email':r'^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+',
      'idcard':r'^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$',
    }
    return True if re.match(data[name],val) else False

  # 正则-验证
  def Test(reg, val):
    return True if re.match(reg, val) else False

  # Base64-加密
  def Encode(param: dict={}):
    try :
      token = jwt.encode(param, Env.key, algorithm='HS256')
      return bytes.decode(token) if type(token)==bytes else token
    except Exception as e :
      return None

  # Base64-解密
  def Decode(token: str=''):
    try :
      data = jwt.decode(token, Env.key, algorithms=['HS256'])
      return data
    except Exception as e :
      return None