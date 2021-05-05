from flask import request

from service.base import Base
from service.admin_token import AdminToken
from model.api_menu import ApiMenu
from util.util import Util

# 系统菜单
class ApiMenus(Base):

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
    fid = Util.Trim(param['fid']) if 'fid' in param.keys() else ''
    title = Util.Trim(param['title']) if 'title' in param.keys() else ''
    url = Util.Trim(param['url']) if 'url' in param.keys() else ''
    # 统计
    m = ApiMenu()
    m.Columns('count(*) AS num')
    m.Where('fid like %s AND title like %s AND url like %s', '%'+fid+'%', '%'+title+'%', '%'+url+'%')
    total = m.FindFirst()
    # 查询
    m.Columns('id', 'fid', 'title', 'ico', 'FROM_UNIXTIME(ctime, %s) as ctime', 'FROM_UNIXTIME(utime, %s) as utime', 'sort', 'url', 'controller', 'action')
    m.Where('fid like %s AND title like %s AND url like %s', '%Y-%m-%d %H:%i:%s', '%Y-%m-%d %H:%i:%s', '%'+fid+'%', '%'+title+'%', '%'+url+'%')
    m.Order('sort DESC', 'fid')
    m.Page(int(page), int(limit))
    list = m.Find()
    # 数据
    for val in list :
      val['action'] = Util.JsonDecode(val['action']) if str(val['action'])!='' else ''
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
    title = Util.Trim(param['title']) if 'title' in param.keys() else ''
    if title == '' :
      return self.GetJSON({'code':4000, 'msg':'名称不能为空!'})
    # 数据
    m = ApiMenu()
    m.Values({
      'fid': Util.Trim(param['fid']) if 'fid' in param.keys() else 0,
      'title': title,
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
    title = Util.Trim(param['title']) if 'title' in param.keys() else ''
    if title == '' :
      return self.GetJSON({'code':4000, 'msg':'名称不能为空!'})
    # 数据
    m = ApiMenu()
    m.Set({
      'fid': Util.Trim(param['fid']) if 'fid' in param.keys() else 0,
      'title': title,
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
    m = ApiMenu()
    m.Where('id in('+ids+')')
    if m.Delete() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'删除失败!'})

  # 动作权限
  def Perm(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 参数
    id = self.Post('id')
    data = self.Post('data')
    if not id or not data :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 执行
    m = ApiMenu()
    m.Set({'action':data})
    m.Where('id=%s', id)
    if m.Update() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'更新失败!'})