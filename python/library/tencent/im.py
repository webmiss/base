from typing import final
from config.tencent import Tencent
from library.curl import Curl
from util.util import Util
from util.base64 import Base64
from util.hmac import Hmac

# 即时通信
class Im:

  Url: str = 'https://console.tim.qq.com/v4/'
  ContentType: str = 'json'

  # 群组-列表
  def GroupList():
    url = Im.GetURL('group_open_http_svc/get_appid_group_list')
    return Curl.PostJson(url, {})
  # 群组-创建
  def GroupCreate(data: dict):
    url = Im.GetURL('group_open_http_svc/create_group')
    return Curl.PostJson(url, data)
  # 群组-解散
  def GroupDestroy(data: dict):
    url = Im.GetURL('group_open_http_svc/destroy_group')
    return Curl.PostJson(url, data)

  # 请求地址
  def GetURL(apiUrl: str):
    cfg = Tencent.TRTC()
    userSig = Im.UserSig(cfg['UserID'])
    random = str(Util.Time())
    return Im.Url+apiUrl+'?sdkappid='+str(cfg['SDKAppID'])+'&identifier='+str(cfg['UserID'])+'&usersig='+userSig+'&random='+random+'&contenttype='+Im.ContentType

  # 鉴权票据
  def UserSig(userId: any, expire: int = 0):
    # 配置
    cfg = Tencent.TRTC()
    if expire == 0 : expire=cfg['ExpireTime']
    # 参数
    param = {
      'TLS.ver': '2.0',
      'TLS.identifier': str(userId),
      'TLS.sdkappid': str(cfg['SDKAppID']),
      'TLS.expire': str(expire),
      'TLS.time': str(Util.Time()),
    }
    # 签名
    param['TLS.sig'] = Im.__hmacsha256(param, cfg['SecretKey'])
    # 压缩
    data = Base64.Compress(Util.JsonEncode(param))
    return Base64.UrlEncode(data)

  # 验证签名
  def VerifySig(userId: int, userSig: str):
    # 解码
    base64 = Base64.UrlDecode(userSig)
    # 解压
    un_sig = Base64.UnCompress(base64)
    data = Util.JsonDecode(bytes.decode(un_sig))
    # 配置
    cfg = Tencent.TRTC()
    if str(cfg['SDKAppID']) != data['TLS.sdkappid'] : return 0
    if str(userId) != data['TLS.identifier'] : return 0
    # 是否过期
    now_time = Util.Time()
    out_time = int(data['TLS.time']) + int(data['TLS.expire'])
    if now_time > out_time : return 0
    return out_time - now_time

  # 获取Sig
  def __hmacsha256(param: dict, key: str):
    content = 'TLS.identifier:'+str(param['TLS.identifier'])+"\n"\
    +'TLS.sdkappid:'+str(param['TLS.sdkappid'])+"\n"\
    +'TLS.time:'+str(param['TLS.time'])+"\n"\
    +'TLS.expire:'+str(param['TLS.expire'])+"\n"
    sig = Base64.Encode(Hmac.Sha256(content, key))
    return bytes.decode(sig)
