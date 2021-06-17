from config.aliyun import Aliyun
from .signature import Signature
from util.util import Util
from util.hash import Hash
from util.base64 import Base64
import oss2

# 对象存储
class Oss:

  OssConn = None              #连接
  AccessKeyId: str = ''       #RAM: AccessKeyId
  AccessKeySecret: str = ''   #RAM: AccessKeySecret
  Endpoint: str = ''          #地域节点
  Bucket: str = ''            #Bucket名称

  # 签名直传
  def Policy(dir: str, file: str, expireTime: int=0, maxSize: int=0):
    ram = Aliyun.RAM()
    cfg = Aliyun.OSS()
    # 默认值
    if expireTime == 0 : expireTime = cfg['ExpireTime']
    if maxSize == 0 : maxSize = cfg['MaxSize']
    # 数据
    res = Signature.PolicySign(expireTime, maxSize)
    res['host'] = 'https://'+cfg['Bucket']+'.'+cfg['Endpoint']
    res['dir'] = dir
    res['file'] = file
    res['max_size'] = maxSize
    # 回调
    callbackBody = Util.JsonEncode({
      'dir': dir,
      'file': file,
      'expire': res['expire'],
      'sign': Hash.Md5(dir+'&'+file+'&'+str(res['expire'])+'&'+ram['AccessKeySecret']),
    })
    callbackData = Util.JsonEncode({
      'callbackUrl': cfg['CallbackUrl'],
      'callbackBodyType': cfg['CallbackType'],
      'callbackBody': callbackBody,
    })
    res['callback'] = Base64.ToStr(Base64.Encode(Base64.ToByte(callbackData)))
    return res

  # 签名直传-验证
  def PolicyVerify(dir: str, file: str, expire: str, sign: str):
    # 配置
    ram = Aliyun.RAM()
    # 验证
    signTmp = Hash.Md5(dir+'&'+file+'&'+expire+'&'+ram['AccessKeySecret'])
    if sign != signTmp : return False
    # 是否超时
    now = Util.Time()
    etime = int(expire)
    if now > etime : return False
    return True

  # 初始化
  def Init():
    # 配置
    ramCfg = Aliyun.RAM()
    ossCfg = Aliyun.OSS()
    if not Oss.AccessKeyId : Oss.AccessKeyId = ramCfg['AccessKeyId']
    if not Oss.AccessKeySecret : Oss.AccessKeySecret = ramCfg['AccessKeySecret']
    if not Oss.Endpoint : Oss.Endpoint = ossCfg['Endpoint']
    if not Oss.Bucket : Oss.Bucket = ossCfg['Bucket']
    # 连接
    if not Oss.OssConn :
      try:
        auth = oss2.Auth(Oss.AccessKeyId, Oss.AccessKeySecret)
        Oss.OssConn = oss2.Bucket(auth, Oss.Endpoint, Oss.Bucket)
      except Exception as e:
        print('[OSS] Conn:', e)
        Oss.OssConn = None
    return Oss.OssConn

  # 列表
  def ListObject(path: str):
    res = {'folder': [], 'file': []}
    # 连接
    conn = Oss.Init()
    if not conn : return res
    # 数据
    for val in oss2.ObjectIterator(conn, prefix = path, delimiter = '/'):
      if val.is_prefix(): res['folder'] += [val.key]
      else : res['file'] += [val.key]
    return res

  # 上传
  def PutObject(file: str, content, headers=None):
    # 连接
    conn = Oss.Init()
    if not conn : return False
    # 执行
    conn.put_object(file, content, headers)
    return True

  # 删除-单个
  def DeleteObject(file: str):
    if len(file)==0 : return False
    # 连接
    conn = Oss.Init()
    if not conn : return False
    # 执行
    conn.delete_object(file)
    return True

  # 删除-多个
  def DeleteObjects(files: list):
    if len(files)==0 : return False
    # 连接
    conn = Oss.Init()
    if not conn : return False
    # 执行
    conn.batch_delete_objects(files)
    return True

  # 删除-文件夹&文件
  def DeleteObjectAll(path: str):
    if len(path)==0 : return False
    # 连接
    conn = Oss.Init()
    if not conn : return False
    # 文件
    last = path[-1:]
    if last != '/' :
      conn.delete_object(path)
      return True
    # 文件夹
    objects = []
    lists = oss2.ObjectIterator(conn, prefix=path)
    for val in lists :
      objects += [val.key]
    return Oss.DeleteObjects(objects)
