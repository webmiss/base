from flask import request

from service.base import Base
from service.admin_token import AdminToken
from model.sys_role import SysRole as SysRoleM
from model.sys_menu import SysMenu
from util.util import Util

class SysRole(Base):

  __menus = {}    #全部菜单
  __permAll = {}  #用户权限

  # 列表
  def List(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    data = self.Post('data')
    page = self.Post('page')
    limit = self.Post('limit')
    if not data or not page or not limit :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    param = Util.JsonDecode(data)
    name = Util.Trim(param['name']) if 'name' in param.keys() else ''
    # 统计
    m = SysRoleM()
    m.Columns('count(*) AS num')
    m.Where('name LIKE %s', '%'+name+'%')
    total = m.FindFirst()
    # 查询
    m.Columns('id', 'name', 'FROM_UNIXTIME(ctime, %s) as ctime', 'FROM_UNIXTIME(utime, %s) as utime', 'perm')
    m.Where('name LIKE %s', '%Y-%m-%d %H:%i:%s', '%Y-%m-%d %H:%i:%s', '%'+name+'%')
    m.Page(int(page), int(limit))
    list = m.Find()
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'list':list, 'total':total['num']})
    
  # 添加
  def Add(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    data = self.Post('data')
    if not data :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    param = Util.JsonDecode(data)
    name = Util.Trim(param['name']) if 'name' in param.keys() else ''
    if name == '' :
      return self.GetJSON({'code':4000, 'msg':'名称不能为空!'})
    # 数据
    m = SysRoleM()
    m.Values({'name': name, 'ctime': Util.Time()})
    if m.Insert() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'添加失败!'})

  # 编辑
  def Edit(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    id = self.Post('id')
    data = self.Post('data')
    if not id or not data :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    param = Util.JsonDecode(data)
    name = Util.Trim(param['name']) if 'name' in param.keys() else ''
    if name == '' :
      return self.GetJSON({'code':4000, 'msg':'名称不能为空!'})
    # 数据
    m = SysRoleM()
    m.Set({'name': name, 'utime': Util.Time()})
    m.Where('id=%s', id)
    if m.Update() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'更新失败!'})

  # 删除
  def Del(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    data = self.Post('data')
    if not data :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    param = Util.JsonDecode(data)
    ids = Util.Implode(',', param)
    # 执行
    m = SysRoleM()
    m.Where('id in('+ids+')')
    if m.Delete() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'删除失败!'})

  # 权限
  def Perm(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    id = self.Post('id')
    perm = self.Post('perm')
    if not id :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    m = SysRoleM()
    m.Set({'perm': perm, 'utime': Util.Time()})
    m.Where('id=%s', id)
    if m.Update() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'更新失败!'})

  # 权限-列表
  def PermList(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    perm = self.Post('perm')
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
    # 用户权限
    self.__permAll = self.__permArr(perm)
    print(self.__permAll)
    # 权限列表
    lists = []
    return self.GetJSON({'code':0, 'msg':'成功', 'list':lists})

  # 权限-拆分
  def __permArr(self, perm: str):
    permAll = {}
    arr = [] if not perm else Util.Explode(' ', perm)
    for val in arr :
      s = Util.Explode(':', val)
      permAll[s[0]] = int(s[1])
    return permAll
