from config.baidu import Baidu
from library.curl import Curl
from util.util import Util

# 百度统计
class TongJi:

  Url: str = 'https://api.baidu.com/json/tongji/v1/'

  # 公共配置
  def GetData(body: dict=None):
    cfg = Baidu.TongJi()
    json = {
      'header':{
        'username': cfg['UserName'],
        'password': cfg['PassWord'],
        'token': cfg['Token'],
        'account_type': cfg['AccountType'],
      }
    }
    if not body : json['body']=body
    return Util.JsonEncode(json)

  # 返回结果
  def __Result(res: dict):
    data = res['body']['data']
    if len(data)>0 and 'result' in data[0].keys() : return data[0]['result']
    return data

  # 站点列表
  def SiteList():
    dataStr = TongJi.GetData()
    res = Curl.Request(TongJi.Url+'ReportService/getSiteList', dataStr, 'POST')
    return TongJi.__Result(res)

