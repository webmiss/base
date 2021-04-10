# 公共配置
class Env :
  debug: bool = False                                   #模式
  host: str = '127.0.0.1'                               #主机
  port: int = 9010                                      #端口
  base_url: str = 'https://demo-python.webmis.vip/'     #资源
  # base_url: str = 'http://localhost/python/public/'     #资源
  root_dir: str = 'public/'                             #根目录
  key: str = 'e4b99adec618e653400966be536c45f8'         #KEY
  # Token
  admin_token_prefix = 'Admin'                          #前缀
  admin_token_time = 2*3600                             #有效时长(2小时)
  admin_token_auto = True                               #自动续期
  api_token_prefix = 'Api'                              #前缀
  api_token_time = 7*24*3600                            #有效时长(7天)
  api_token_auto = True                                 #自动续期
