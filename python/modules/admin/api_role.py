from flask import request

from service.base import Base
from service.admin_token import AdminToken
from model.api_role import ApiRole as ApiRoleM
from model.api_menu import ApiMenu
from util.util import Util

class ApiRole(Base):

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
    m = ApiRoleM()
    m.Columns('count(*) AS num')
    m.Where(where, whereData)
    total = m.FindFirst()
    # 查询
    m.Columns('id', 'name', 'FROM_UNIXTIME(ctime, %s) as ctime', 'FROM_UNIXTIME(utime, %s) as utime', 'perm')
    m.Where(where, '%Y-%m-%d %H:%i:%s', '%Y-%m-%d %H:%i:%s', whereData)
    m.Order(order if order else 'id DESC')
    m.Page(int(page), int(limit))
    list = m.Find()
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'list':list, 'total':int(total['num'])})

  # 搜索条件
  def __getWhere(self, param):
    # 参数
    name = Util.Trim(param['name']) if 'name' in param.keys() else ''
    # 条件
    where = 'name LIKE %s'
    whereData = ('%'+name+'%')
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
    name = Util.Trim(param['name']) if 'name' in param.keys() else ''
    if name == '' :
      return self.GetJSON({'code':4000, 'msg':'名称不能为空!'})
    # 模型
    m = ApiRoleM()
    m.Values({'name': name, 'ctime': Util.Time()})
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
    name = Util.Trim(param['name']) if 'name' in param.keys() else ''
    if name == '' :
      return self.GetJSON({'code':4000, 'msg':'名称不能为空!'})
    # 模型
    m = ApiRoleM()
    m.Set({'name': name, 'utime': Util.Time()})
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
    m = ApiRoleM()
    m.Where('id in('+ids+')')
    if m.Delete() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'删除失败!'})

  # 权限
  def Perm(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    id = self.JsonName(json, 'id')
    perm = self.JsonName(json, 'perm')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not id :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 模型
    m = ApiRoleM()
    m.Set({'perm': perm, 'utime': Util.Time()})
    m.Where('id=%s', id)
    if m.Update() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'更新失败!'})

  # 权限-列表
  def RoleList(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    # 查询
    m = ApiRoleM()
    m.Columns('id', 'name')
    data = m.Find()
    lists = [{'label':'无', 'value':0}]
    for val in data :
      lists += [{'label': val['name'], 'value':val['id']}]
    return self.GetJSON({'code':0, 'msg':'成功', 'list':lists})

  # 权限-列表
  def PermList(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    perm = self.JsonName(json, 'perm')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    # 全部菜单
    self.__menus = {}
    model = ApiMenu()
    model.Columns('id', 'fid', 'title', 'url', 'ico', 'controller', 'action')
    model.Order('sort, id')
    data = model.Find()
    for val in data :
      fid = str(val['fid'])
      if fid in self.__menus : self.__menus[fid] += [val]
      else : self.__menus[fid] = [val]
    # 用户权限
    self.__permAll = self.__permArr(perm)
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'list':self._getMenu('0')})

  # 权限-拆分
  def __permArr(self, perm: str):
    permAll = {}
    arr = [] if not perm else Util.Explode(' ', perm)
    for val in arr :
      s = Util.Explode(':', val)
      permAll[s[0]] = int(s[1])
    return permAll
  
  # 递归菜单
  def _getMenu(self, fid: str):
    data = []
    M = self.__menus[fid] if fid in self.__menus else []
    for val in M :
      # 菜单权限
      id = str(val['id'])
      perm = self.__permAll[id] if id in self.__permAll.keys() else 0
      # 动作权限
      action = []
      actionArr = []
      actionStr = str(val['action'])
      if actionStr != '' : actionArr = Util.JsonDecode(actionStr)
      for v in actionArr :
        permVal = int(v['perm'])
        checked = True if perm&permVal>0 else False
        action += [{
          'id': str(val['id'])+'_'+str(v['perm']),
          'label': str(v['name']),
          'checked': checked,
          'perm': v['perm'],
        }]
      # 数据
      checked = True if id in self.__permAll.keys() else False
      tmp = {'id': val['id'], 'label': val['title'], 'checked': checked}
      if val['fid']==0 : tmp['show'] = True
      # children
      menu = self._getMenu(id)
      if len(menu)>0 : tmp['children'] = menu
      elif len(action)>0 :
        tmp['action'] = True
        tmp['children'] = action
      data += [tmp]
    return data
