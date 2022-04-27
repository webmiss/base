from config.tencent import Tencent
from library.curl import Curl
from util.util import Util
from .signature import Signature

# 即时通信
class Im:

  # 请求地址
  def GetURL(apiUrl: str):
    cfg = Tencent.TRTC()
    userSig = Signature.UserSig(cfg['UserID'])
    random = str(Util.Time())
    return 'https://console.tim.qq.com/v4/'+apiUrl+'?sdkappid='+str(cfg['SDKAppID'])+'&identifier='+str(cfg['UserID'])+'&usersig='+userSig+'&random='+random+'&contenttype=json'

  # 群组-列表
  def GroupList():
    url = Im.GetURL('group_open_http_svc/get_appid_group_list')
    return Curl.Request(url, '{}', 'POST')
  # 群组-创建
  def GroupCreate(data: dict):
    url = Im.GetURL('group_open_http_svc/create_group')
    return Curl.Request(url, Util.JsonEncode(data), 'POST')
  # 群组-解散
  def GroupDestroy(data: dict):
    url = Im.GetURL('group_open_http_svc/destroy_group')
    return Curl.Request(url, Util.JsonEncode(data), 'POST')
