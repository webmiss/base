from base.base import Base
from model.sys_menu import SysMenu

# 系统菜单
class SysMenus(Base):

  menus = None

  # 获取菜单
  def getMenus(self):
    # 全部菜单
    self.menus = {}
    model = SysMenu()
    model.Columns('id', 'fid', 'title', 'url', 'ico')
    model.Order('sort DESC, id')
    data = model.Find()
    for val in data :
      fid = str(val['fid'])
      if fid in self.menus : self.menus[fid] += [val]
      else : self.menus[fid] = [val]
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'menus':self._getMenu('0')})

  # 递归菜单
  def _getMenu(self, fid: str):
    data = []
    M = self.menus[fid] if fid in self.menus else []
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