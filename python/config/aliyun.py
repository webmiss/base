# 阿里云配置
class Aliyun :

  # RAM访问控制
  def RAM():
    return {
      'AccessKeyId': 'LTAI5tBxpsyAoe2EV1goV8wW',
      'AccessKeySecret': 'FhMQw6WRyZbMAsTc9jrlCw4efYh2Qx',
    }

  # 对象存储
  def OSS():
    return {
      'Endpoint': 'oss-cn-chengdu.aliyuncs.com',            #区域
      'Bucket': 'webmis-upload',                            #存储空间
      'MaxSize': 100*1024*1024,                             #最大文件
      'ExpireTime': 30,                                     #签名有效时间(秒)
      'callbackUrl': 'https://api.webmis.vip/',             #回调URL
      'callbackType': 'application/x-www-form-urlencoded',  #回调数据类型
      'ImgUrl': 'http://img.webmis.vip/',                   #图片域名
    }
