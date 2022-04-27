from util.util import Util
from .signature import Signature
from config.tencent import Tencent
from library.curl import Curl

# 实时音视频
class Trtc:

  SdkAppId: int = 0

  # 公共配置
  def Init():
    cfg = Tencent.TRTC()
    Signature.ApiUrl = 'https://trtc.tencentcloudapi.com/'
    Signature.Host = 'trtc.tencentcloudapi.com'
    Signature.Service = 'trtc'
    Signature.Version = '2019-07-22'
    Trtc.SdkAppId = cfg['SDKAppID']

  # 房间-查询
  def RoomList(StartTime: int, EndTime: int):
    # 参数
    Trtc.Init()
    Signature.Action = 'DescribeRoomInformation'
    # 数据
    data = {
      'SdkAppId': str(Trtc.SdkAppId),
      'StartTime': StartTime,
      'EndTime': EndTime,
    }
    # 请求头
    header = Signature.V3Header(data)
    return Curl.Request(Signature.ApiUrl, Util.JsonEncode(data), 'POST', header)

  # 房间-解散
  def RoomDismiss(roomId: str):
    # 参数
    Trtc.Init()
    Signature.Action = 'DismissRoomByStrRoomId'
    # 数据
    time = Util.Time()
    data = {
      'SdkAppId': str(Trtc.SdkAppId),
      'RoomId': roomId,
    }
    # 请求头
    header = Signature.V3Header(data)
    return Curl.Request(Signature.ApiUrl, Util.JsonEncode(data), 'POST', header)