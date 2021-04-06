from task.base import Base
from config.socket import Socket as cfg
from service.socket import Socket as SocketServer

import asyncio
import websockets

# Socket
class Socket(Base):

  # 启动
  def Start(self):
    server = websockets.serve(SocketServer().Open, cfg.Host, cfg.Port)
    asyncio.get_event_loop().run_until_complete(server)
    asyncio.get_event_loop().run_forever()