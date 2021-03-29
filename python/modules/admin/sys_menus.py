from util.util import Util
from service.base import Base
from service.admin_token import AdminToken
from model.sys_menu import SysMenu

# 系统菜单
class SysMenus(Base):

  __menus = {}
  __permAll = {}

  # 获取菜单
  def GetMenus(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 全部菜单
    self.__menus = {}
    model = SysMenu()
    model.Columns('id', 'fid', 'title', 'url', 'ico', 'controller', 'action')
    model.Order('sort DESC, id')
    data = model.Find()
    for val in data :
      fid = str(val['fid'])
      if fid in self.__menus : self.__menus[fid] += [val]
      else : self.__menus[fid] = [val]
    # 全部权限
    self.__permAll = AdminToken().perm(token)
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'menus':self._getMenu('0')})

  # 递归菜单
  def _getMenu(self, fid: str):
    data = []
    M = self.__menus[fid] if fid in self.__menus else []
    for val in M :
      id = str(val['id'])
      # 权限
      if id not in self.__permAll.keys() : continue
      # 动作权限
      perm = self.__permAll[id]
      action = []
      actionArr = []
      actionStr = str(val['action'])
      if actionStr != '' : actionArr = Util.JsonDecode(actionStr)
      for v in actionArr :
        permVal = int(v['perm'])
        if v['type']=='1' and perm&permVal>0 : action += [v]
      # 数据
      value = {'url': val['url'], 'controller': val['controller'], 'action': action}
      tmp = {'icon': val['ico'], 'label': val['title'], 'value': value}
      menu = self._getMenu(id)
      if len(menu)>0 : tmp['children']=menu
      data += [tmp]
    return data