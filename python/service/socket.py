from config.env import Env
from service.admin_token import AdminToken
from service.api_token import ApiToken
from util.util import Util

# Socket服务
class Socket:

  clients = {}  #连接

  # 路由
  async def router(self, uid: str, conn: any, msg: str):
    data = Util.JsonDecode(msg)
    if data['type']=='msg' :
      await self.getMsg(uid, conn, data)
    else:
      await self.send(conn, {'code':0, 'type':'', 'msg':'成功'})

  # 消息
  async def getMsg(self, uid, conn, msg):
    print(uid, msg)
    # 群发
    if uid=='0':
      await self.sendAll(msg)
      return
    # 单发
    await self.send(conn, {
      'code': 0,
      'type': 'msg',
      'msg': '成功',
      'time': Util.Date(),
    })

  # 群发
  async def sendAll(self, data: dict):
    arr = self.clients.values()
    for conn in arr :
      await self.send(conn, data)

  # 单发
  async def send(self, conn, data: dict):
    res = Util.JsonEncode(data)
    await conn.send(res)

  # 连接
  async def Open(self, conn, path):
    # 验证
    uid = self.verify(conn.path)
    if uid == '' : return await conn.close()
    # 保存
    self.clients[uid] = conn
    # 消息
    await self.onMessage(uid, conn)

  # 消息
  async def onMessage(self, uid, conn):
    try :
      async for msg in conn:
        uid = self.verify(conn.path)
        if uid == '' : return await conn.close()
        # 路由
        await self.router(uid, conn, msg)
    except Exception as e :
      # 断开连接
      self.clients.pop(uid)

  # 验证
  def verify(self, url):
    # 参数
    arr = Util.UrlToArray(url)
    if not arr : return ''
    type = arr['type'] if 'type' in arr.keys() else ''
    token = arr['token'] if 'token' in arr.keys() else ''
    if not type or not token : return ''
    # 验证
    if token == Env.key :
      return '0'
    elif type == 'api' :
      tData = ApiToken.Token(token)
      if not tData : return ''
      return str(tData['uid'])
    elif type == 'admin' :
      tData = AdminToken.Token(token)
      if not tData : return ''
      return str(tData['uid'])
    return ''
