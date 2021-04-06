import json
from config.env import Env
from config.socket import Socket as cfg
from websocket import create_connection

# Socket客户端
class Socket:

  # 发送
  def Send(type, data):
    url = cfg.Type+'://'+cfg.Host+':'+str(cfg.Port)+'/?type='+type+'&token='+Env.key
    msg = json.dumps(data)
    ws = create_connection(url)
    ws.send(msg)
    ws.close()