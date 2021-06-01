from config.tencent import Tencent
from service.base import Base
from service.admin_token import AdminToken
from library.tencent.signature import Signature

# TWebLive直播
class Tweblive(Base) :

  # 列表
  def List(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 数据
    data = [
      {'id': 1, 'group_id': '@TGS#aRHBAOFHK', 'name':'xxx直播1'},
      {'id': 2, 'group_id': '@TGS#aRHBAOFHK', 'name':'xxx直播2'},
    ]
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'list':data})

  # 用户信息
  def UserInfo(self):
    # 验证
    token = self.Post('token')
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    tData = AdminToken.Token(token)
    # 配置
    cfg = Tencent.TRTC()
    userId = str(tData['uid'])
    userSin = Signature.UserSig(userId)
    # 数据
    uinfo = {
      'sdk_app_id': cfg['SDKAppID'],
      'user_id': userId,
      'user_sig': userSin,
      'live_domain_name': cfg['PlayDomain'],
    }
    # 返回
    return self.GetJSON({'code':0, 'msg':'成功', 'uinfo':uinfo})
