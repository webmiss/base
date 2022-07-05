from flask import request

from config.env import Env
from service.base import Base
from service.data import Data
from service.admin_token import AdminToken
from library.safety import Safety
from library.redis import Redis
from model.user import User
from model.user_info import UserInfo
from model.api_perm import ApiPerm
from model.api_role import ApiRole
from model.sys_perm import SysPerm
from model.sys_role import SysRole
from util.util import Util
from util.hash import Hash

class SysUser(Base):

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
    m = User()
    m.Columns('count(*) AS num')
    m.Table('user as a')
    m.LeftJoin('user_info as b', 'a.id=b.uid')
    m.Where(where, *whereData)
    total = m.FindFirst()
    # 查询
    m.Table('user as a')
    m.LeftJoin('user_info as b', 'a.id=b.uid')
    m.LeftJoin('sys_perm as c', 'a.id=c.uid')
    m.LeftJoin('api_perm as d', 'a.id=d.uid')
    m.Columns(
      'a.id AS uid', 'a.uname', 'a.email', 'a.tel', 'a.state', 'FROM_UNIXTIME(a.rtime, %s) as rtime', 'FROM_UNIXTIME(a.ltime, %s) as ltime', 'FROM_UNIXTIME(a.utime, %s) as utime',
      'b.nickname', 'b.position', 'b.name', 'b.gender', 'b.img', 'FROM_UNIXTIME(b.birthday, %s) as birthday',
      'c.role AS sys_role', 'c.perm AS sys_perm',
      'd.role AS api_role', 'd.perm AS api_perm'
    )
    m.Where(where, '%Y-%m-%d %H:%i:%s', '%Y-%m-%d %H:%i:%s', '%Y-%m-%d %H:%i:%s', '%Y-%m-%d', *whereData)
    m.Order(order if order else 'a.id DESC')
    m.Page(int(page), int(limit))
    list = m.Find()
    # 数据
    for val in list :
      val['uid'] = str(val['uid'])
      val['state'] = True if val['state']=='1' else False
      val['img'] = Data.Img(str(val['img']))
      if not val['sys_role'] : val['sys_role']=''
      if not val['sys_perm'] : val['sys_perm']=''
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'list':list, 'total':int(total['num'])})

  # 搜索条件
  def __getWhere(self, param):
    # 参数
    uname = Util.Trim(param['uname']) if 'uname' in param.keys() else ''
    nickname = Util.Trim(param['nickname']) if 'nickname' in param.keys() else ''
    name = Util.Trim(param['name']) if 'name' in param.keys() else ''
    department = Util.Trim(param['department']) if 'department' in param.keys() else ''
    position = Util.Trim(param['position']) if 'position' in param.keys() else ''
    # 条件
    where = '(a.uname LIKE %s OR a.tel LIKE %s OR a.email LIKE %s) AND b.nickname LIKE %s AND b.name LIKE %s AND b.department LIKE %s AND b.position LIKE %s'
    whereData = ('%'+uname+'%', '%'+uname+'%', '%'+uname+'%', '%'+nickname+'%', '%'+name+'%', '%'+department+'%', '%'+position+'%')
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
    tel = Util.Trim(param['tel']) if 'tel' in param.keys() else ''
    passwd = Util.Trim(param['passwd']) if 'passwd' in param.keys() else Env.password
    # 验证
    if not Safety.IsRight('tel', tel) :
      return self.GetJSON({'code':4000, 'msg':'手机号码有误!'})
    if not Safety.IsRight('passwd', passwd) :
      return self.GetJSON({'code':4000, 'msg':'密码为6～16位!'})
    # 是否存在
    m = User()
    m.Columns('id')
    m.Where('tel=%s', tel)
    user = m.FindFirst()
    if user :
      return self.GetJSON({'code':4000, 'msg':'该用户已存在!'})
    # 新增
    uid = Data.Mist('ID')
    conn = m.DBConn()
    try:
      conn.begin()
      cs = conn.cursor()
      # 用户
      m1 = User()
      m1.Values({'id':uid, 'tel':tel, 'password':Hash.Md5(passwd)})
      sql, args = m1.InsertSQL()
      cs.execute(sql, args)
      # 详情
      m2 = UserInfo()
      m2.Values({'uid':uid})
      sql, args = m2.InsertSQL()
      cs.execute(sql, args)
      # 权限-System
      m3 = SysPerm()
      m3.Values({'uid':uid, 'role':1, 'utime':Util.Time()})
      sql, args = m3.InsertSQL()
      cs.execute(sql, args)
      # 权限-Api
      m4 = ApiPerm()
      m4.Values({'uid':uid, 'role':1, 'utime':Util.Time()})
      sql, args = m4.InsertSQL()
      cs.execute(sql, args)
      # 提交
      conn.commit()
      return self.GetJSON({'code':0, 'msg':'成功'})
    except Exception as e:
      conn.rollback()
      return self.GetJSON({'code':5000, 'msg':'添加失败!'})

  # 编辑
  def Edit(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    uid = self.JsonName(json, 'uid')
    data = self.JsonName(json, 'data')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not uid or not data :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    param = Util.JsonDecode(data)
    tel = Util.Trim(param['tel']) if 'tel' in param.keys() else ''
    passwd = Util.Trim(param['passwd']) if 'passwd' in param.keys() else ''
    # 验证
    if not Safety.IsRight('tel', tel) :
      return self.GetJSON({'code':4000, 'msg':'手机号码有误!'})
    # 是否存在
    m = User()
    m.Columns('id')
    m.Where('tel=%s', tel)
    user = m.FindFirst()
    if not user :
      return self.GetJSON({'code':4000, 'msg':'该用户不存在!'})
    # 更新
    uData = {'tel': tel}
    if passwd != '' : uData['password'] = Hash.Md5(passwd)
    m.Set(uData)
    m.Where('id=%s', uid)
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
    m1 = User()
    m1.Where('id in('+ids+')')
    m2 = UserInfo()
    m2.Where('uid in('+ids+')')
    m3 = SysPerm()
    m3.Where('uid in('+ids+')')
    m4 = ApiPerm()
    m4.Where('uid in('+ids+')')
    if m1.Delete() and m2.Delete() and m3.Delete() and m4.Delete() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'删除失败!'})

  # 状态
  def State(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    uid = self.JsonName(json, 'uid')
    state = self.JsonName(json, 'state')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not uid :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 超级管理员
    tData = AdminToken.Token(token)
    if uid==1 and tData['uid']!=1 :
      return self.GetJSON({'code':4000, 'msg':'您不是超级管理员!'})
    # 更新
    state = "1" if state=='1' else '0'
    m = User()
    m.Set({'state': state})
    m.Where('id=%s', uid)
    if m.Update() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'更新失败!'})

  # 权限
  def Perm(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    type = self.JsonName(json, 'type')
    uid = self.JsonName(json, 'uid')
    role = self.JsonName(json, 'role')
    perm = self.JsonName(json, 'perm')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not type or not uid :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 超级管理员
    tData = AdminToken.Token(token)
    if uid==1 and tData['uid']!=1 :
      return self.GetJSON({'code':4000, 'msg':'您不是超级管理员!'})
    # 类型
    if type=='admin' and self._permSys(uid, role, perm) :
      return self.GetJSON({'code':0, 'msg':'成功'})
    elif type=='api' and self._permApi(uid, role, perm) :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'更新失败!'})
  # 权限-System
  def _permSys(self, uid, role, perm):
    # 数据
    uData = {'role': role, 'perm': perm, 'utime': Util.Time()}
    # 模型
    m = SysPerm()
    m.Set(uData)
    m.Where('uid=%s', uid)
    if m.Update() :
      # 角色权限
      if not perm :
        m1 = SysRole()
        m1.Columns('perm')
        m1.Where('id=%s', role)
        data = m1.FindFirst()
        perm = data['perm'] if 'perm' in data.keys() else ''
      # 更新权限
      return self._setPerm(Env.admin_token_prefix+'_perm_'+str(uid), perm)
    return False
  # 权限-Api
  def _permApi(self, uid, role, perm):
    # 数据
    uData = {'role': role, 'perm': perm, 'utime': Util.Time()}
    # API权限
    m = ApiPerm()
    m.Set(uData)
    m.Where('uid=%s', uid)
    if m.Update() :
      # 角色权限
      if not perm :
        m1 = ApiRole()
        m1.Columns('perm')
        m1.Where('id=%s', role)
        data = m1.FindFirst()
        perm = data['perm'] if 'perm' in data.keys() else ''
      # 更新权限
      return self._setPerm(Env.api_token_prefix+'_perm_'+str(uid), perm)
    return False
  # 更新权限
  def _setPerm(self, key: str, perm: str):
    redis = Redis()
    redis.Set(key, perm)
    redis.Close()
    return True

  # 个人信息
  def Info(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    uid = self.JsonName(json, 'uid')
    data = self.JsonName(json, 'data')
    # 验证
    msg = AdminToken.Verify(token, request.path)
    if msg != '' :
      return self.GetJSON({'code':4001, 'msg':msg})
    if not uid or not data :
      return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    param = Util.JsonDecode(data)
    info = {
      'nickname': Util.Trim(param['nickname']) if 'nickname' in param.keys() else '',
      'name': Util.Trim(param['name']) if 'name' in param.keys() else '',
      'gender': Util.Trim(param['gender']) if 'gender' in param.keys() else '',
      'birthday': Util.StrToTime(param['birthday'], '%Y-%m-%d') if 'birthday' in param.keys() else 0,
      'department': Util.Trim(param['department']) if 'department' in param.keys() else '',
      'position': Util.Trim(param['position']) if 'position' in param.keys() else '',
    }
    # 模型
    m = UserInfo()
    m.Set(info)
    m.Where('uid=%s', uid)
    if m.Update() :
      return self.GetJSON({'code':0, 'msg':'成功'})
    else :
      return self.GetJSON({'code':5000, 'msg':'更新失败!'})
