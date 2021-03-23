from hashlib import md5
from config.env import Env
from library.safety import Safety
from library.redis import Redis
from util.util import Util
from model.api_menu import ApiMenu

# 后台Token
class ApiToken:

  # 验证
  def verify(self, token: str, urlPerm: str):
    # Token
    if token=='' : return 'Token不能为空!'
    tData = Safety.decode(token)
    if not tData : return 'Token验证失败!'
    # 是否过期
    uid = str(tData['uid'])
    redis = Redis()
    time = redis.Ttl(Env.api_token_prefix+'_token_'+uid)
    redis.Close()
    if time <1 : return 'Token已过期!'
    # 续期
    if Env.api_token_auto :
      redis = Redis()
      redis.Expire(Env.api_token_prefix+'_token_'+uid, Env.api_token_time)
      redis.Expire(Env.api_token_prefix+'_perm_'+uid, Env.api_token_time)
      redis.Close()
    # URL权限
    if urlPerm=='' : return ''
    arr = Util.explode('/', urlPerm)
    action = arr[-1:][0]
    controller = Util.implode('/', arr[:-1])
    # 菜单
    menu = ApiMenu()
    menu.Columns('id', 'action')
    menu.Where('controller=%s', controller)
    menuData = menu.FindFirst()
    if not menuData : return '菜单验证无效!'
    # 验证-菜单
    id = str(menuData['id'])
    permData = self.perm(token)
    if id not in permData.keys() : return '无权访问菜单!'
    # 验证-动作
    actionVal = permData[id]
    permArr = Util.json_decode(menuData['action'])
    permVal = 0
    for val in permArr :
      if action==val['action'] :
        permVal = int(val['perm'])
        break
    if actionVal&permVal==0 : return '无权访问动作!'
    return ''

  # 权限数组
  def perm(self, token: str):
    # Token
    tData = Safety.decode(token)
    if not tData : return 'Token验证失败!'
    # 权限
    redis = Redis()
    permStr = redis.Get(Env.api_token_prefix+'_perm_'+tData['uid'])
    redis.Close()
    # 拆分
    permAll = {}
    arr = [] if not permStr else Util.explode(' ', permStr)
    for val in arr :
      s = Util.explode(':', val)
      permAll[s[0]] = int(s[1])
    return permAll

  # 生成
  def create(self, data: dict):
    data['l_time'] = Util.date('%Y-%m-%d %H:%M:%S')
    token = Safety.encode(data)
    # 缓存
    redis = Redis()
    key = Env.api_token_prefix+'_token_'+str(data['uid'])
    redis.Set(key, '1')
    redis.Expire(key, Env.api_token_time)
    redis.Close()
    return token
    
  # 获取
  def token(token: str):
    tData = Safety.decode(token)
    if tData :
      redis = Redis()
      tData['time'] = redis.Ttl(Env.api_token_prefix+'_token_'+tData['uid'])
      redis.Close()
    return tData