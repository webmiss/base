from flask import request

from config.env import Env
from service.base import Base
from service.data import Data
from service.admin_token import AdminToken
from library.file_eo import FileEo
from library.upload import Upload
from model.user_info import UserInfo as UserInfoM
from util.util import Util

class UserInfo(Base):

  ImgDir: str='upload/user/img/'

  # 列表
  def List(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    tData = AdminToken.Token(token)
    # 查询
    model = UserInfoM()
    model.Columns('nickname', 'name', 'gender', 'FROM_UNIXTIME(birthday, %s) as birthday', 'department', 'position', 'img')
    model.Where('uid=%s', '%Y-%m-%d', str(tData['uid']))
    list = model.FindFirst()
    # 数据
    list['img'] = Data.Img(str(list['img']))
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'list':list})

  # 编辑
  def Edit(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    data = self.JsonName(json, 'data')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    tData = AdminToken.Token(token)
    if not data : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 数据
    param = Util.JsonDecode(data)
    model = UserInfoM()
    info = {
      'nickname': Util.Trim(param['nickname']),
      'name': Util.Trim(param['name']),
      'gender': Util.Trim(param['gender']),
      'birthday': Util.StrToTime(Util.Trim(param['birthday']), '%Y-%m-%d'),
      'department': Util.Trim(param['department']),
      'position': Util.Trim(param['position']),
    }
    model.Set(info)
    model.Where('uid=%s', tData['uid'])
    model.Update()
    # 返回
    info['uname'] = tData['uname']
    info['img'] = param['img']
    info['birthday'] = Util.Date('%Y-%m-%d', info['birthday'])
    return self.GetJSON({'code':0, 'msg':'成功', 'uinfo':info})

  # 头像
  def Upimg(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    base64 = self.JsonName(json, 'base64')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    if not base64 : return self.GetJSON({'code':4000, 'msg':'参数错误!'})
    # 上传
    img = Upload.Base64({'path':self.ImgDir, 'base64':base64})
    if not img : return self.GetJSON({'code':5000, 'msg':'上传失败!'})
    # 数据
    tData = AdminToken.Token(token)
    model = UserInfoM()
    model.Columns('img')
    model.Where('uid=%s', tData['uid'])
    imgData = model.FindFirst()
    model.Set({'img':self.ImgDir+img})
    model.Where('uid=%s', tData['uid'])
    if not model.Update() : return self.GetJSON({'code':5000, 'msg':'上传失败!'})
    # 清理
    FileEo.Root = Env.root_dir
    FileEo.RemoveAll(imgData['img'])
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'img':Data.Img(self.ImgDir+img)})