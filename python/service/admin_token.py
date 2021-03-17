from hashlib import md5
from config.env import Env
from library.safety import Safety
from library.redis import Redis
from util.util import Util

# 后台Token
class AdminToken:

  # 验证
  def verify(self, token: str, urlPerm: str):
    # Token
    tData = Safety.decode(token)
    if not tData : return False, 'Token验证失败!'
    # 续期Token
    if Env.admin_token_auto :
      redis = Redis()
      key = Env.admin_token_prefix+'_token_'+tData['uid']
      redis.Expire(key, Env.admin_token_time)
      redis.Close()
    # URL权限
    if urlPerm=='' : return True, ''
    arr = Util.explode('/', urlPerm)
    action = arr[-1:][0]
    controller = Util.implode('/', arr[:-1])
    print(tData, urlPerm)
    print(controller, action)

  # 生成
  def create(self, data: dict):
    data['l_time'] = Util.date('%Y-%m-%d %H:%M:%S')
    token = Safety.encode(data)
    # 缓存
    redis = Redis()
    key = Env.admin_token_prefix+'_token_'+str(data['uid'])
    redis.Set(key, '1')
    redis.Expire(key, Env.admin_token_time)
    redis.Close()
    return token
    
