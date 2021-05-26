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
      'Endpoint': 'oss-cn-chengdu.aliyuncs.com',
      'Bucket': 'webmis-upload',
      'ImgUrl': 'http://img.webmis.vip/',
    }
