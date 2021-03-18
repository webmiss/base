from base.base import Base
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
    # self.__menus = {}
    model = SysMenu()
    model.Columns('id', 'fid', 'title', 'url', 'ico')
    model.Order('sort DESC, id')
    data = model.Find()
    for val in data :
      fid = str(val['fid'])
      if fid in self.__menus : self.__menus[fid] += [val]
      else : self.__menus[fid] = [val]
    # 全部权限
    self.__permAll = AdminToken.perm(token)
    print(self.__permAll)
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'menus':self._getMenu('0')})

  # 递归菜单
  def _getMenu(self, fid: str):
    data = []
    M = self.__menus[fid] if fid in self.__menus else []
    for val in M :
      id = str(val['id'])
      tmp = {
        'icon': val['ico'],
        'label': val['title'],
        'value': val['url'],
      }
      menu = self._getMenu(id)
      if len(menu)>0 : tmp['children']=menu
      data += [tmp]
    return data