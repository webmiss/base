from config.tencent import Tencent
from util.util import Util
from util.base64 import Base64
from util.hash import Hash
from datetime import datetime


# 签名
class Signature:

  ApiUrl: str = 'https://cvm.tencentcloudapi.com/'      #接口
  Host: str = 'cvm.tencentcloudapi.com'                 #主机
  Service: str = 'cvm'                                  #服务
  RequestMethod: str = 'POST'                           #请求方式
  ContentType: str = 'application/json; charset=utf-8'  #数据类型
  CanonicalURI: str = '/'                               #URI参数
  CanonicalQueryString: str = ''                        #查询字符串: Limit=10&Offset=0
  SignedHeaders: str = 'content-type;host'              #参与签名
  Algorithm: str = 'TC3-HMAC-SHA256'                    #签名算法
  Action: str = 'DescribeInstances'                     #动作
  Version: str = '2017-03-12'                           #版本
  Region: str = 'ap-guangzhou'                          #区域


  # V3-Header
  def V3Header(data: dict={}):
    # 数据
    json = Util.JsonEncode(data) if len(data)>0 else '{}'
    HashedRequestPayload = Hash.Sha256(json)
    # 请求串
    CanonicalRequest = Signature.RequestMethod+"\n"\
    + Signature.CanonicalURI+"\n"\
    + Signature.CanonicalQueryString+"\n"\
    + 'content-type:'+Signature.ContentType+"\n"+'host:'+Signature.Host+"\n"+"\n"\
    + Signature.SignedHeaders+"\n"\
    + HashedRequestPayload
    # 字符串
    timeStamp = str(Util.Time())
    date = datetime.utcfromtimestamp(float(timeStamp)).strftime("%Y-%m-%d")
    CredentialScope = date+'/'+Signature.Service+'/tc3_request'
    HashedCanonicalRequest = Hash.Sha256(CanonicalRequest)
    StringToSign = Signature.Algorithm+"\n"\
    + timeStamp+"\n"\
    + CredentialScope+"\n"\
    + HashedCanonicalRequest
    # 计算签名
    cfg = Tencent.CAPI()
    SecretDate = Hash.HmacSha256(date, str.encode("TC3"+cfg['SecretKey']))
    SecretService = Hash.HmacSha256(Signature.Service, SecretDate)
    SecretSigning = Hash.HmacSha256('tc3_request', SecretService)
    Sign = Hash.HexEncode(Hash.HmacSha256(StringToSign, SecretSigning))
    # Authorization
    Authorization = Signature.Algorithm+' '\
    + 'Credential='+cfg['SecretId']+'/'+CredentialScope+', '\
    + 'SignedHeaders='+Signature.SignedHeaders+', '\
    + 'Signature='+Sign
    # 请求头
    header = {
      'Authorization': Authorization,
      'Content-Type': Signature.ContentType,
      'Host': Signature.Host,
      'X-TC-Action': Signature.Action,
      'X-TC-Version': Signature.Version,
      'X-TC-Timestamp': timeStamp,
      'X-TC-Region': Signature.Region,
    }
    return header

  # UserSig
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
    param['TLS.sig'] = Signature.__hmacsha256(param, cfg['SecretKey'])
    # 压缩
    data = Base64.Compress(Util.JsonEncode(param))
    return Base64.UrlEncode(data)

  # UserSig-验证
  def VerifyUserSig(userId: int, userSig: str):
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
    sig = Base64.Encode(Hash.HmacSha256(content, str.encode(key)))
    return Base64.ToStr(sig)