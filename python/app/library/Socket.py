from app.Env import Env

import os
import json
from websocket import create_connection

# WebSocket
class Socket:

  # 发送
  def send(self,type,msg):
    url = 'ws://'+Env.socket_ip+':'+str(Env.socket_port)+'/?type='+type+'&token='+Env.key
    msg = json.dumps(msg)
    ws = create_connection(url)
    ws.send(msg)
    ws.close()

  # 发送-Cli
  def sendCli(self,type,msg):
    os.system(Env.cli+' socket send '+type+'  \''+json.dumps(msg)+'\' 2>&1')

