from config.aliyun import Aliyun
from util.util import Util
from util.base64 import Base64
from util.hash import Hash

# 签名
class Signature:

  # 签名直传
  def PolicySign(expireTime: int, maxSize: int):
    # 配置
    cfg = Aliyun.RAM()
    conditions = []
    # 限制大小
    conditions += [['content-length-range', 0, maxSize]]
    # 超时时间
    now = Util.Time()
    expire = now + expireTime
    expiration = Util.GmtISO8601(expire)
    # 签名数据
    policyStr = Util.JsonEncode({'expiration':expiration, 'conditions':conditions})
    policy = Base64.ToStr(Base64.Encode(Base64.ToByte(policyStr)))
    signature = Base64.ToStr(Base64.Encode(Hash.HmacSha1(policy, Base64.ToByte(cfg['AccessKeySecret']))))
    # 返回
    return {
      'accessid': cfg['AccessKeyId'],
      'policy': policy,
      'signature': signature,
      'expire': expire,
    }