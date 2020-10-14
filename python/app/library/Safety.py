from app.Env import Env
import re
import jwt

# 安全验证类
class Safety:

  # 正则
  def isRight(name,val):
    data = {
      'uname':r'^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{3,15}$',
      'passwd':r'^[a-zA-Z0-9|_|@|-|*|&]{6,16}$',
      'tel':r'^1\d{10}$',
      'email':r'^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+',
      'idcard':r'^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$',
    }
    return True if re.match(data[name],val) else False

  # 加密
  def encode(data={}):
    try :
      token = jwt.encode(data, Env.key, algorithm='HS256')
      return token.decode('utf8')
    except Exception as e :
      return None

  # 解密
  def decode(token=''):
    try :
      data = jwt.decode(token, Env.key, algorithms=['HS256'])
      return data
    except Exception as e :
      return None