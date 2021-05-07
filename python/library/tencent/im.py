from util.util import Util
from config.tencent import Tencent

# 即时通信
class Im:

  # 鉴权票据
  def UserSig(self, userId: int, expire: int = 86400*180):
    # 配置
    cfg = Tencent.TRTC()
    # 参数
    param = {
      'TLS.ver': '2.0',
      'TLS.identifier': str(userId),
      'TLS.sdkappid': str(cfg['SDKAppID']),
      'TLS.expire': str(expire),
      'TLS.time': str(Util.Time()),
    }
    param['TLS.sig'] = self.__hmacsha256(param, cfg['SecretKey'])
    print(param)
    return ''

  # 获取Sig
  def __hmacsha256(self, param: dict, key: str):
    content = ''
    for k,v in param.items():
      if k=='TLS.ver' or k=='TLS.sig': continue
      content += k+':'+v+"\n"
    print(content)
    return ''