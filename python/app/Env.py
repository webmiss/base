# 配置
class Env :
  debug=True  #调试模式
  devinfo=False  #调试信息
  exclude=['api','admin','favicon.ico','upload']  #排除路由
  key='e4b99adec618e653400966be536c45f8'  #KEY

  # 缓存
  def redis(self):
    conf = {
      'host':'127.0.0.1',
      'port':6379,
      'password':None,
      'db':0,
      'decode_responses':True
    }
    return conf
