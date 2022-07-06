from flask import request

from service.base import Base
from service.admin_token import AdminToken
from model.web_news_class import WebNewsClass as WebNewsClassM
from util.util import Util

class WebNewsClass(Base):

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
    m = WebNewsClassM()
    m.Columns('count(*) AS num')
    m.Where(where, whereData)
    total = m.FindFirst()
    # 查询
    m.Columns('id', 'name', 'FROM_UNIXTIME(ctime, %s) as ctime', 'FROM_UNIXTIME(utime, %s) as utime', 'state', 'sort')
    m.Where(where, '%Y-%m-%d %H:%i:%s', '%Y-%m-%d %H:%i:%s', whereData)
    m.Page(int(page), int(limit))
    m.Order(order if order else 'sort DESC')
    list = m.Find()
    # 数据
    for val in list :
      val['state'] = True if val['state']=='1' else False
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
    state = '1' if param['name'] else '0'
    sort = Util.Trim(param['sort']) if 'sort' in param.keys() else 0
    if name == '' :
      return self.GetJSON({'code':4000, 'msg':'名称不能为空!'})
    # 模型
    m = WebNewsClassM()
    m.Values({'name':name, 'ctime':Util.Time(), 'utime':Util.Time(), 'state':state, 'sort':sort})
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
    state = '1' if param['name'] else '0'
    sort = Util.Trim(param['sort']) if 'sort' in param.keys() else 0
    if name == '' :
      return self.GetJSON({'code':4000, 'msg':'名称不能为空!'})
    # 模型
    m = WebNewsClassM()
    m.Set({'name':name, 'utime':Util.Time(), 'state':state, 'sort':sort})
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
    m = WebNewsClassM()
    m.Where('id in('+ids+')')
    if m.Delete() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'删除失败!'})

  # 状态
  def State(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    id = self.JsonName(json, 'id')
    state = self.JsonName(json, 'state')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not id :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 模型
    m = WebNewsClassM()
    m.Set({'state': '1' if state else '0', 'utime': Util.Time()})
    m.Where('id=%s', id)
    if m.Update() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'更新失败!'})
