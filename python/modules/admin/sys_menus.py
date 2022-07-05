from flask import request

from service.base import Base
from service.admin_token import AdminToken
from model.sys_menu import SysMenu
from util.util import Util

# 系统菜单
class SysMenus(Base):

  __menus = {}    #全部菜单
  __permAll = {}  #用户权限

  # 列表
  def List(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    data = self.JsonName(json, 'data')
    page = self.JsonName(json, 'page')
    limit = self.JsonName(json, 'limit')
    order = self.JsonName(json, 'order')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    if not data or not page or not limit :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 条件
    param = Util.JsonDecode(data)
    where, whereData = self.__getWhere(param)
    # 统计
    m = SysMenu()
    m.Columns('count(*) AS num')
    m.Where(where, *whereData)
    total = m.FindFirst()
    # 查询
    m.Columns('id', 'fid', 'title', 'en', 'ico', 'FROM_UNIXTIME(ctime, %s) as ctime', 'FROM_UNIXTIME(utime, %s) as utime', 'sort', 'url', 'controller', 'action')
    m.Where(where, '%Y-%m-%d %H:%i:%s', '%Y-%m-%d %H:%i:%s', *whereData)
    m.Order(order if order else 'fid DESC, sort, id DESC')
    m.Page(int(page), int(limit))
    list = m.Find()
    # 数据
    for val in list :
      val['action'] = Util.JsonDecode(val['action']) if str(val['action'])!='' else ''
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'list':list, 'total':int(total['num'])})

  # 搜索条件
  def __getWhere(self, param):
    # 参数
    fid = Util.Trim(param['fid']) if 'fid' in param.keys() else ''
    title = Util.Trim(param['title']) if 'title' in param.keys() else ''
    en = Util.Trim(param['en']) if 'en' in param.keys() else ''
    url = Util.Trim(param['url']) if 'url' in param.keys() else ''
    # 条件
    where = 'fid like %s AND title like %s AND en like %s AND url like %s'
    whereData = ('%'+fid+'%', '%'+title+'%', '%'+en+'%', '%'+url+'%')
    return where, whereData

  # 添加
  def Add(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    data = self.JsonName(json, 'data')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not data :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    param = Util.JsonDecode(data)
    title = Util.Trim(param['title']) if 'title' in param.keys() else ''
    if title == '' :
      return self.GetJSON({'code':4000, 'msg':'名称不能为空!'})
    # 模型
    m = SysMenu()
    m.Values({
      'fid': Util.Trim(param['fid']) if 'fid' in param.keys() else 0,
      'title': title,
      'en': Util.Trim(param['en']) if 'en' in param.keys() else '',
      'url': Util.Trim(param['url']) if 'url' in param.keys() else '',
      'ico': Util.Trim(param['ico']) if 'ico' in param.keys() else '',
      'sort': Util.Trim(param['sort']) if 'sort' in param.keys() else 0,
      'controller': Util.Trim(param['controller']) if 'controller' in param.keys() else '',
      'ctime': Util.Time(),
    })
    if m.Insert() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'添加失败!'})

  # 编辑
  def Edit(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    id = self.JsonName(json, 'id')
    data = self.JsonName(json, 'data')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not id or not data :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    param = Util.JsonDecode(data)
    title = Util.Trim(param['title']) if 'title' in param.keys() else ''
    if title == '' :
      return self.GetJSON({'code':4000, 'msg':'名称不能为空!'})
    # 模型
    m = SysMenu()
    m.Set({
      'fid': Util.Trim(param['fid']) if 'fid' in param.keys() else 0,
      'title': title,
      'en': Util.Trim(param['en']) if 'en' in param.keys() else '',
      'url': Util.Trim(param['url']) if 'url' in param.keys() else '',
      'ico': Util.Trim(param['ico']) if 'ico' in param.keys() else '',
      'sort': Util.Trim(param['sort']) if 'sort' in param.keys() else 0,
      'controller': Util.Trim(param['controller']) if 'controller' in param.keys() else '',
      'utime': Util.Time(),
    })
    m.Where('id=%s', id)
    if m.Update() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'更新失败!'})

  # 删除
  def Del(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    data = self.JsonName(json, 'data')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not data :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    param = Util.JsonDecode(data)
    ids = Util.Implode(',', param)
    # 模型
    m = SysMenu()
    m.Where('id in('+ids+')')
    if m.Delete() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'删除失败!'})

  # 动作权限
  def Perm(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    id = self.JsonName(json, 'id')
    data = self.JsonName(json, 'data')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not id or not data :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 模型
    m = SysMenu()
    m.Set({'action':data})
    m.Where('id=%s', id)
    if m.Update() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'更新失败!'})

  # 获取菜单-全部
  def GetMenusAll(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 全部菜单
    self._getMenus()
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'menus':self._getMenusAll('0')})

  # 递归菜单
  def _getMenusAll(self, fid: str):
    data = []
    M = self.__menus[fid] if fid in self.__menus else []
    for val in M :
      id = str(val['id'])
      tmp = {'label': val['title'], 'value': id}
      menu = self._getMenusAll(id)
      if len(menu)>0 : tmp['children']=menu
      data += [tmp]
    return data

  # 获取菜单-权限
  def GetMenusPerm(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 全部菜单
    self._getMenus()
    # 用户权限
    self.__permAll = AdminToken.Perm(token)
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'menus':self._getMenusPerm('0')})

  # 递归菜单
  def _getMenusPerm(self, fid: str):
    data = []
    M = self.__menus[fid] if fid in self.__menus else []
    for val in M :
      # 菜单权限
      id = str(val['id'])
      if id not in self.__permAll.keys() : continue
      # 动作权限
      perm = self.__permAll[id]
      action = []
      actionArr = []
      actionStr = str(val['action'])
      if actionStr != '' : actionArr = Util.JsonDecode(actionStr)
      for v in actionArr :
        permVal = int(v['perm'])
        if (perm&permVal)>0 : action += [v]
      # 数据
      value = {'url': val['url'], 'controller': val['controller'], 'action': action}
      tmp = {'icon': val['ico'], 'label': val['title'], 'en': val['en'], 'value': value}
      menu = self._getMenusPerm(id)
      if len(menu)>0 : tmp['children']=menu
      data += [tmp]
    return data

  # 全部菜单
  def _getMenus(self):
    self.__menus = {}
    model = SysMenu()
    model.Columns('id', 'fid', 'title', 'en', 'url', 'ico', 'controller', 'action')
    model.Order('sort, id')
    data = model.Find()
    for val in data :
      fid = str(val['fid'])
      if fid in self.__menus : self.__menus[fid] += [val]
      else : self.__menus[fid] = [val]
