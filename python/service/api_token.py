from config.env import Env
from library.safety import Safety
from library.redis import Redis
from util.util import Util
from util.hash import Hash
from model.api_menu import ApiMenu

# 后台Token
class ApiToken:

  # 验证
  def Verify(token: str, urlPerm: str):
    # Token
    if token=='' : return 'Token不能为空!'
    tData = Safety.Decode(token)
    if not tData : return 'Token验证失败!'
    # 是否过期
    uid = str(tData['uid'])
    key = Env.api_token_prefix+'_token_'+uid
    redis = Redis()
    access_token =  str(redis.Get(key))
    time = redis.Ttl(key)
    redis.Close()
    if Env.api_token_sso and Hash.Md5(token) != access_token: return '强制退出!'
    if time <1 : return 'Token已过期!'
    # 续期
    if Env.api_token_auto :
      redis = Redis()
      redis.Expire(key, Env.api_token_time)
      redis.Expire(Env.api_token_prefix+'_perm_'+uid, Env.api_token_time)
      redis.Close()
    # URL权限
    if urlPerm=='' : return ''
    arr = Util.Explode('/', urlPerm)
    action = arr[-1:][0]
    controller = Util.Implode('/', arr[:-1])
    # 菜单
    menu = ApiMenu()
    menu.Columns('id', 'action')
    menu.Where('controller=%s', controller)
    menuData = menu.FindFirst()
    if not menuData : return '菜单验证无效!'
    # 验证-菜单
    id = str(menuData['id'])
    permData = ApiToken.Perm(token)
    if id not in permData.keys() : return '无权访问菜单!'
    # 验证-动作
    actionVal = permData[id]
    permArr = Util.JsonDecode(menuData['action'])
    permVal = 0
    for val in permArr :
      if action==val['action'] :
        permVal = int(val['perm'])
        break
    if actionVal&permVal==0 : return '无权访问动作!'
    return ''

  # 权限数组
  def Perm(token: str):
    permAll = {}
    # Token
    tData = Safety.Decode(token)
    if not tData : return permAll
    # 权限
    redis = Redis()
    permStr = redis.Get(Env.api_token_prefix+'_perm_'+tData['uid'])
    redis.Close()
    # 拆分
    arr = [] if not permStr else Util.Explode(' ', permStr)
    for val in arr :
      s = Util.Explode(':', val)
      permAll[s[0]] = int(s[1])
    return permAll

  # 生成
  def Create(data: dict):
    data['l_time'] = Util.Date('%Y-%m-%d %H:%M:%S')
    token = Safety.Encode(data)
    # 缓存
    redis = Redis()
    key = Env.api_token_prefix+'_token_'+str(data['uid'])
    redis.Set(key, Hash.Md5(token))
    redis.Expire(key, Env.api_token_time)
    redis.Close()
    return token
    
  # 解析
  def Token(token: str):
    tData = Safety.Decode(token)
    if tData :
      redis = Redis()
      tData['time'] = redis.Ttl(Env.api_token_prefix+'_token_'+tData['uid'])
      redis.Close()
    return tData