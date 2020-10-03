from app.Env import Env
import json
import jwt

# 安全验证类
class Safety:

  # 加密
  def encode(self,data={}):
    try :
      token = jwt.encode(data, Env.key, algorithm='HS256')
      return token.decode('utf8')
    except Exception as e :
      return ''

  # 解密
  def decode(self,token=''):
    try :
      data = jwt.decode(token, Env.key, algorithms=['HS256'])
      return data
    except Exception as e :
      return ''