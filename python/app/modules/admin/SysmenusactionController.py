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
    m1 = SysMenu()
    m1.where('url=":url:"',{'url':url})
    m1.columns('id')
    mid = m1.findFirst()
    if len(mid)==0 : return self.getJSON({'code':4000,'msg':'获取 '+str(url)+' 不存在!'})
    # 全部动作
    action = []
    permAll = AdminToken().perm(self.tokenData['uid'])
    perm = permAll[str(mid['id'])]
    m2 = SysMenuAction()
    m2.columns('name,action,ico,perm')
    aMenus = m2.find()
    for val in aMenus :
      # 匹配权限值
      if int(perm)&int(val['perm'])>0 :
        action += [{'name':val['name'],'action':val['action'],'ico':val['ico']}]
    return self.getJSON({'code':0,'action':action})
