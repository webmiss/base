import os
import json
from app.Env import Env
from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.common.Inc import Inc
from app.library.Upload import Upload
from app.model.UserInfo import UserInfo

class UserinfoController(Base) :

  tokenData = None
  imgDir = 'upload/user/img/'

  # 构造函数
  def __init__(self):
    self.tokenData = AdminToken().urlVerify('UserInfo')

  # 列表
  def list(self):
    info = UserInfo().findFirst({'where':'uid='+str(self.tokenData['uid'])})
    # 添加
    if not info :
      UserInfo().insert({
        'uid': str(self.tokenData['uid']),
        'ctime': Inc.date('%Y%m%d%H%M%S'),
      })
      # 查询
      info = UserInfo().findFirst({'where':'uid='+str(self.tokenData['uid'])})
    # 数据
    list = {
      'img': Env.base_url+info['img'] if info['img'] else '',
      'nickname': info['nickname'],
      'name': info['name'],
      'gender': info['gender'],
      'birthday': str(info['birthday']) if info['birthday'] else "",
      'position': info['position'],
    }
    return self.getJSON({'code':0,'msg':'成功','list':list})

  # 编辑
  def edit(self):
    req = self.request()
    data = req.get('data')
    if(not data): return self.getJSON({'code':4000,'msg':'参数错误!'})
    jsonData = json.loads(data)
    # 数据
    params = {}
    arr = ['uid','img']
    keys = jsonData.keys()
    for key in keys :
      if key in arr : continue
      params[key] = jsonData[key].strip()
    # 用户信息
    uinfo = {
      'img': jsonData['img'],
      'nickname': params['nickname'],
      'name': params['name'],
      'gender': params['gender'],
      'birthday': params['birthday'],
      'position': params['position'],
    }
    # 保存
    res = UserInfo().update(params,'uid='+str(self.tokenData['uid']))
    if res : return self.getJSON({'code':0,'msg':'成功','uinfo':uinfo})
    else : return self.getJSON({'code':5000,'msg':'保存失败!'})

  # 头像上传
  def upImg(self):
    req = self.request()
    base64 = req.get('base64')
    if not base64 : return self.getJSON({'code':4000,'msg':'Base64内容为空!'})
    # 上传
    res = Upload().base64({'path':self.imgDir,'base64':base64})
    if res :
      info = UserInfo().findFirst({'where':'uid='+str(self.tokenData['uid'])})
      if not info :
        UserInfo().insert({
          'uid': self.tokenData['uid'],
          'img': self.imgDir+res['filename'],
          'ctime': Inc.date('%Y%m%d%H%M%S'),
        })
      else :
        # 头像
        img = info['img'] if info['img'] else ''
        # 保存
        UserInfo().update({
          'img': self.imgDir+res['filename'],
          'utime': Inc.date('%Y%m%d%H%M%S'),
        },'uid='+str(self.tokenData['uid']))
        # 清理头像
        if os.path.exists(img) : os.remove(img)
      return self.getJSON({'code':0,'msg':'上传成功','img':Env.base_url+self.imgDir+res['filename']})
    else :
      return self.getJSON({'code':5000,'msg':'保存图片失败!'})