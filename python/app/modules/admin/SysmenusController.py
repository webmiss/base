from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.common.Inc import Inc
from app.model.SysMenu import SysMenu

# 用户
class SysmenusController(Base) :

  menus = {}
  tokenData = {}
  permAll = {}

  # 列表
  def list(self):
    # 验证
    AdminToken().urlVerify('SysMenus')
    # 搜索
    req = self.request()
    data = Inc.json_decode(req.get('data'))
    fid = data['fid'].strip() if 'fid' in data.keys() else ''
    title = data['title'].strip() if 'title' in data.keys() else ''
    url = data['url'].strip() if 'url' in data.keys() else ''
    where = 'fid LIKE "%:fid:%" AND title LIKE "%:title:%" AND url LIKE "%:url:%"'
    bind = {'fid':fid,'title':title,'url':url}
    # 查询
    model = SysMenu()
    model.where(where,bind)
    model.order('sort DESC, fid')
    # 统计
    total = model.count()
    # 分页
    page = req.get('page')
    limit = req.get('limit')
    start = (int(page)-1)*int(limit)
    model.limit(str(start)+','+limit)
    # 数据
    list = model.find()
    # 状态
    for val in list :
      val['ctime'] = str(val['ctime']) if val['ctime'] else ''
      val['utime'] = str(val['utime']) if val['utime'] else ''
    return self.getJSON({'code':0,'msg':'成功','list':list,'total':total})

  # 获取[菜单]
  def getMenus(self):
    # 验证
    self.tokenData = AdminToken().verify()
    # 全部菜单
    self.menus = {}
    model = SysMenu()
    model.columns('id,fid,title,url,ico')
    model.order('sort DESC,id')
    all = model.find()
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
