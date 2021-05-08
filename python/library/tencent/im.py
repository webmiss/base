import hmac
import hashlib

from config.tencent import Tencent
from util.util import Util
from util.base64 import Base64

# 即时通信
class Im:

  # 鉴权票据
  def UserSig(self, userId: int, expire: int = 0):
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
    param['TLS.sig'] = self.__hmacsha256(param, cfg['SecretKey'])
    # 压缩
    data = Base64.Compress(Util.JsonEncode(param))
    return Base64.UrlEncode(data)

  # 验证
  def VerifySig(self, userId: int, userSig: str):
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
  def __hmacsha256(self, param: dict, key: str):
    # 排序
    keys = sorted(param)
    # 拼接
    content = ''
    for k in keys:
      if k=='TLS.ver' or k=='TLS.sig': continue
      content += k + ':'+ param[k] +"\n"
    sig = Base64.Encode(hmac.new(str.encode(key), str.encode(content), hashlib.sha256).digest())
    return bytes.decode(sig)
