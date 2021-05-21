from .signature import Signature

# 实时音视频
class Trtc(Signature):

  SdkAppId: int = 0

  # 房间-查询
  def RoomList():
    data = {}
    Trtc.V3Header(data)
    return ''