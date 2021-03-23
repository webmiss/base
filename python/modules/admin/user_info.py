from base.base import Base
from service.admin_token import AdminToken
from model.user_info import UserInfo as UserInfoM
from util.util import Util

from flask import request

class UserInfo(Base):

  # 列表
  def List(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    tData = AdminToken.token(token)
    # 查询
    model = UserInfoM()
    model.Columns('nickname', 'name', 'gender', 'birthday', 'position', 'img')
    model.Where('uid=%s', str(tData['uid']))
    list = model.FindFirst()
    # 数据
    list['birthday'] = Util.Date("%Y-%m-%d", float(list['birthday']))
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'list':list})

  # 编辑
  def Edit(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken().verify(token, request.path)
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    tData = AdminToken.token(token)
    # 参数
    data = self.Post('data')
    if not data : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    param = Util.Json_decode(data)
    # 数据
    model = UserInfoM()
    info = {
      'nickname': Util.Trim(param['nickname']),
      'name': Util.Trim(param['name']),
      'gender': Util.Trim(param['gender']),
      'birthday': Util.Strtotime(Util.Trim(param['birthday']), "%Y-%m-%d"),
      'position': Util.Trim(param['position']),
    }
    model.Set(info)
    model.Where('uid=%s', tData['uid'])
    model.Update()
    # 返回
    info['uname'] = tData['uname']
    info['img'] = param['img']
    return self.GetJSON({'code':0, 'msg':'成功', 'uinfo':info})