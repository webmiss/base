from app.Env import Env
from app.common.Base import Base
from app.common.AdminToken import AdminToken
from app.common.ApiToken import ApiToken
from app.common.Msg import Msg

import asyncio
import websockets

class SocketTask(Base) :

  fds = {}    #Socket链接
  suid = '0'  #系统消息ID
  uid = ''    #用户ID
  token = ''  #Token

  # 客户端
  def sendAction(self,type='admin',data='') :
    token = Env.key
    client = self.client('ws://'+Env.socket_ip+':'+str(Env.socket_port)+'/?type='+type+'&token='+token,data)
    asyncio.get_event_loop().run_until_complete(client)
  async def client(self,uri,data) :
    async with websockets.connect(uri) as websocket:
      await websocket.send(data)
      await websocket.close()

  # 启动
  def startAction(self) :
    server = websockets.serve(self.open, Env.socket_ip, Env.socket_port)
    asyncio.get_event_loop().run_until_complete(server)
    asyncio.get_event_loop().run_forever()

  # 链接
  async def open(self,server,path) :
    # 清理
    uids = list(set(self.fds.keys()))
    for k in uids :
      if self.fds[k].closed : self.fds.pop(k)
    # 参数
    param = self.__getParam(path)
    token = param['token'] if 'token' in param.keys() else ''
    if not token : return await self.__errer(server,'Socket参数错误!')
    # 类型
    type = param['type'] if 'type' in param.keys() else ''
    if type=='admin' : res = AdminToken.socket(token)
    elif type=='api' : res = ApiToken.socket(token)
    else : return await self.__errer(server,'Socket参数错误!')
    # 验证
    if res['state'] or token==Env.key :
      # 用户ID
      if token==Env.key :
        self.uid = str(self.suid)
        self.token = {'uid':self.suid}
      else :
        self.uid = str(res['data']['uid'])
        self.token = res['data']
      # 记录FD
      self.fds[self.uid] = server
      # 消息
      async for msg in server:
        await Msg().router(self.fds,server,msg,self.token)
    else : return await self.__errer(server,res['msg'])

  # 获取参数
  def __getParam(self,path) :
    path = path[2:]
    arr = path.split('&')
    param = {}
    for v in arr :
      tmp = v.split('=')
      param[tmp[0]] = tmp[1]
    return param

  # 错误信息
  async def __errer(self,server,msg) :
    await server.send(self.getJSON({'code':4000,'msg':msg}))
    await server.close()