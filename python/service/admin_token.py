from hashlib import md5
from config.env import Env
from library.safety import Safety
from library.redis import Redis
from util.util import Util
from model.sys_menu import SysMenu

# 后台Token
class AdminToken:

  # 验证
  def verify(self, token: str, urlPerm: str):
    # Token
    tData = Safety.decode(token)
    if not tData : return 'Token验证失败!'
    # 续期
    if Env.admin_token_auto :
      redis = Redis()
      redis.Expire(Env.admin_token_prefix+'_token_'+tData['uid'], Env.admin_token_time)
      redis.Expire(Env.admin_token_prefix+'_perm_'+tData['uid'], Env.admin_token_time)
      redis.Close()
    # URL权限
    if urlPerm=='' : return ''
    arr = Util.explode('/', urlPerm)
    action = arr[-1:][0]
    controller = Util.implode('/', arr[:-1])
    # 菜单
    menu = SysMenu()
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
    if permVal == 0 : return '动作验证无效!'
    if actionVal&permVal==0 : return '无权访问动作!'
    return ''

  # 权限数组
  def perm(self, token: str):
    # Token
    tData = Safety.decode(token)
    if not tData : return 'Token验证失败!'
    # 权限
    redis = Redis()
    key = Env.admin_token_prefix+'_perm_'+tData['uid']
    permStr = redis.Get(key)
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
    key = Env.admin_token_prefix+'_token_'+str(data['uid'])
    redis.Set(key, '1')
    redis.Expire(key, Env.admin_token_time)
    redis.Close()
    return token
    
  # 获取
  def token(token: str):
    return Safety.decode(token)