from app.common.Base import Base
from app.common.AdminToken import AdminToken

from app.model.SysMenu import SysMenu

# 用户
class SysmenusController(Base) :

  menus = {}
  tokenData = {}
  permAll = {}

  # 构造函数
  def __init__(self):
    # 验证
    self.tokenData = AdminToken().verify()

  # 获取[菜单]
  def getMenus(self):
    # 全部菜单
    self.menus = {}
    all = SysMenu().find({'columns':'id,fid,title,url,ico','order':'sort DESC,id'})
    for val in all :
      fid = str(val['fid'])
      if fid in self.menus : self.menus[fid] += [val]
      else : self.menus[fid] = [val]
    # 全部权限
    self.permAll = AdminToken().perm(self.tokenData['uid'])
    # 组合菜单
    return self.getJSON({'code':0,'menus':self._getMenu(0)})
  # 递归菜单
  def _getMenu(self,fid) :
    data = []
    M = self.menus[str(fid)] if str(fid) in self.menus else []
    for val in M :
      if str(val['id']) in self.permAll.keys() :
        val['children'] = self._getMenu(val['id'])
        data += [val]
    return data
