from config.aliyun import Aliyun
import oss2

# 对象存储
class Oss:

  OssConn = None              #连接
  AccessKeyId: str = ''       #RAM: AccessKeyId
  AccessKeySecret: str = ''   #RAM: AccessKeySecret
  Endpoint: str = ''          #地域节点
  Bucket: str = ''            #Bucket名称

  # 初始化
  def Init():
    # 配置
    cfg = Aliyun.RAM()
    if not Oss.AccessKeyId : Oss.AccessKeyId = cfg['AccessKeyId']
    if not Oss.AccessKeySecret : Oss.AccessKeySecret = cfg['AccessKeySecret']
    if not Oss.Endpoint : Oss.Endpoint = cfg['Endpoint']
    if not Oss.Bucket : Oss.Bucket = cfg['Bucket']
    # 连接
    if not Oss.OssConn :
      try:
        auth = oss2.Auth(Oss.AccessKeyId, Oss.AccessKeySecret)
        Oss.OssConn = oss2.Bucket(auth, Oss.Endpoint, Oss.Bucket)
      except Exception as e:
        print('[OSS] Conn:', e)
        Oss.OssConn = None
    return Oss.OssConn

  # 上传
  def PutObject(object: str, content, headers=None):
    conn = Oss.Init()
    conn.put_object(object, content, headers)
    print(conn)
    return True