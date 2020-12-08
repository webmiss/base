from app.common.Base import Base
from app.common.Inc import Inc
import json

# 消息类
class Msg(Base) :

  __fds = {}
  __token = {}

  # 路由
  async def router(self,fds,socket,msg,token) :
    # 参数
    self.__fds = fds
    self.__token = token
    # 数据
    data = Inc.json_decode(msg)
    if not data :
      try : await socket.send(self.getJSON({'code':4000,'msg':'格式错误!'}))
      except Exception as e: pass
    # 消息
    elif data['type']=='msg' : await self.msg(socket,data)
    # 心跳
    else : await socket.send(self.getJSON({'type':'','code':0,'msg':'成功'}))

  # 消息
  async def msg(self,socket,data) :
    # 数据
    print(self.__token,data)
    # 指定用户
    if data['uid'] in self.__fds.keys() :
      server = self.__fds[data['uid']]
      await server.send(self.getJSON({'type':'msg','code':0,'msg':data['msg']}))
