from flask import request

from config.env import Env
from service.base import Base
from service.data import Data
from service.admin_token import AdminToken
from library.safety import Safety
from model.user import User
from model.user_info import UserInfo
from model.api_perm import ApiPerm
from util.util import Util

class SysUser(Base):

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
    uname = param['uname'] if 'uname' in param.keys() else ''
    # 统计
    model = User()
    model.Columns('count(*) AS num')
    total = model.FindFirst()
    # 查询
    model.Table('user as a')
    model.LeftJoin('user_info as b', 'a.id=b.uid')
    model.LeftJoin('sys_perm as c', 'a.id=c.uid')
    model.Columns(
      'a.id AS uid', 'a.uname', 'a.email', 'a.tel', 'a.state', 'FROM_UNIXTIME(a.rtime, %s) as rtime', 'FROM_UNIXTIME(a.ltime, %s) as ltime', 'FROM_UNIXTIME(a.utime, %s) as utime',
      'b.nickname', 'b.position', 'b.name', 'b.gender', 'FROM_UNIXTIME(b.birthday, %s) as birthday', 'b.img',
      'c.role', 'c.perm'
    )
    model.Where(
      'a.uname LIKE %s OR a.tel LIKE %s OR a.email LIKE %s',
      '%Y-%m-%d %H:%i:%s', '%Y-%m-%d %H:%i:%s', '%Y-%m-%d %H:%i:%s', '%Y-%m-%d',
      '%'+uname+'%', '%'+uname+'%', '%'+uname+'%'
    )
    model.Order('a.id DESC')
    model.Page(int(page), int(limit))
    list = model.Find()
    # 状态
    for val in list :
      val['uid'] = str(val['uid'])
      val['state'] = True if val['state']=='1' else False
      val['img'] = Data.Img(str(val['img']))
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
    tel = param['tel'] if 'tel' in param.keys() else ''
    passwd = param['passwd'] if 'passwd' in param.keys() else Env.password
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
    uid = Data.GetId('ID')
    conn = m.DBConn()
    try:
      conn.begin()
      cs = conn.cursor()
      # 用户
      m1 = User()
      m1.Values({'id':uid, 'tel':tel, 'password':Util.Md5(passwd)})
      sql, args = m1.InsertSql()
      cs.execute(sql, args)
      # 详情
      m2 = UserInfo()
      m2.Values({'uid':uid})
      sql, args = m2.InsertSql()
      cs.execute(sql, args)
      # 权限
      m3 = ApiPerm()
      m3.Values({'uid':uid, 'role':1, 'utime':Util.Time()})
      sql, args = m3.InsertSql()
      cs.execute(sql, args)
      # 提交
      conn.commit()
      return self.GetJSON({'code':0, 'msg':'成功'})
    except Exception as e:
      conn.rollback()
      return self.GetJSON({'code':5000, 'msg':'添加失败!'})

