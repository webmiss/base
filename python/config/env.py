# 公共配置
class Env :
  machine_id: int = 1                                   #机器标识
  debug: bool = False                                   #模式
  host: str = '127.0.0.1'                               #主机
  port: int = 9010                                      #端口
  key: str = 'e4b99adec618e653400966be536c45f8'         #KEY
  password: str = '123456'                              #默认密码
  # 资源
  base_url: str = 'https://demo-python.webmis.vip/'
  # base_url: str = 'http://localhost/python/public/'
  root_dir: str = 'public/'
  # Token
  admin_token_prefix: str = 'Admin'                     #前缀
  admin_token_time: int = 2*3600                        #有效时长(2小时)
  admin_token_auto: bool = True                         #自动续期
  api_token_prefix: str = 'Api'                         #前缀
  api_token_time: int = 7*24*3600                       #有效时长(7天)
  api_token_auto: bool = True                           #自动续期
  # Logs
  log_source: str = 'python'                            #访问日志-来源
  log_db: bool = True                                   #访问日志-数据库
  log_file: bool = False                                #访问日志-文件
