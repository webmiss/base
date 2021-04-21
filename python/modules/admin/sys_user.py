from flask import request

from config.env import Env
from service.base import Base
from service.data import Data
from service.admin_token import AdminToken
from model.user import User
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
    uid = Data.GetId()
    print(tel, passwd, uid)
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功'})

