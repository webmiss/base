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
    # 查询
    model = UserInfo()
    model.where('uid='+str(self.tokenData['uid']))
    info = model.findFirst()
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
    jsonData = json.loads(data)
    if not data or type(data)!=dict :
      return self.getJSON({'code':4000,'msg':'参数错误!'})
    # 数据
    model = UserInfo()
    model.nickname = jsonData['nickname'].strip()
    model.name = jsonData['name'].strip()
    model.gender = jsonData['gender'].strip()
    model.birthday = jsonData['birthday'].strip()
    model.position = jsonData['position'].strip()
    model.where('uid='+str(self.tokenData['uid']))
    # 用户信息
    uinfo = {
      'img': jsonData['img'],
      'nickname': jsonData['nickname'].strip(),
      'name': jsonData['name'].strip(),
      'gender': jsonData['gender'].strip(),
      'birthday': jsonData['birthday'].strip(),
      'position': jsonData['position'].strip(),
    }
    # 保存
    if model.update() : return self.getJSON({'code':0,'msg':'成功','uinfo':uinfo})
    else : return self.getJSON({'code':5000,'msg':'保存失败!'})

  # 头像上传
  def upImg(self):
    req = self.request()
    base64 = req.get('base64')
    if not base64 : return self.getJSON({'code':4000,'msg':'Base64内容为空!'})
    # 上传
    res = Upload().base64({'path':self.imgDir,'base64':base64})
    if res :
      m1 = UserInfo()
      m1.where('uid='+str(self.tokenData['uid']))
      info = m1.findFirst()
      # 头像
      img = info['img'] if info['img'] else ''
      # 保存
      m2 = UserInfo()
      m2.img = self.imgDir+res['filename']
      m2.where('uid='+str(self.tokenData['uid']))
      if m2.update() :
        # 清理头像
        if os.path.exists(img) : os.remove(img)
        return self.getJSON({'code':0,'msg':'上传成功','img':Env.base_url+self.imgDir+res['filename']})
      else :
        return self.getJSON({'code':5000,'msg':'保存数据失败!'})
    else :
      return self.getJSON({'code':5000,'msg':'保存图片失败!'})