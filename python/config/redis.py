
# Redis配置
class Redis :

  # 默认
  def Default():
    return {
      'host': '127.0.0.1',    #主机
      'port': 6379,           #端口
      'password': '',         #密码
      'db': 0,                #硬盘
      'max': 200,             #最大数
      'timeout': 5,           #阻塞时间(秒)
    }

  # 其它
  def Other():
    return {
      'host': '127.0.0.1',    #主机
      'port': 6379,           #端口
      'password': '',         #密码
      'db': 0,                #硬盘
      'max': 200,             #最大数
      'timeout': 10,          #阻塞时间(秒)
    }