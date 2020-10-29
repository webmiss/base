from app.common.Base import Base
from app.common.AdminToken import AdminToken

from app.model.SysMenu import SysMenu
from app.model.SysMenuAction import SysMenuAction

# 用户
class SysmenusactionController(Base) :

  tokenData = {}

  # 构造函数
  def __init__(self):
    # 验证
    self.tokenData = AdminToken().verify()

  # 获取[动作菜单]
  def getAction(self):
    req = self.request()
    url = req.get('url')
    # 是否为空
    if url=='' : return self.getJSON({'code':4000,'msg':'获取动作不能为空!'})
    # 菜单ID
    mid = SysMenu().findFirst({'where':'url="%s"'%(url),'columns':'id'})
    if mid == None : return self.getJSON({'code':4000,'msg':'获取动作不存在!'})
    # 全部动作
    action = []
    permAll = AdminToken().perm(self.tokenData['uid'])
    perm = permAll[str(mid['id'])]
    aMenus = SysMenuAction().find({'columns':'name,action,ico,perm'})
    for val in aMenus :
      # 匹配权限值
      if int(perm)&int(val['perm'])>0 :
        action += [{'name':val['name'],'action':val['action'],'ico':val['ico']}]
    return self.getJSON({'code':0,'action':action})
