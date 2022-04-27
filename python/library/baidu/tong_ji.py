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
    if body : json['body']=body
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

  # 网站概况-趋势数据
  def TrendRpt(params: dict = {}):
    # 参数
    param = Util.ArrayMerge({
      'method':'overview/getTimeTrendRpt',
      'site_id':'',             #应用ID
      'start_date':'',          #开始日期
      'end_date':'',            #结束日期
      'metrics':'pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count',
    }, params)
    # 请求
    dataStr = TongJi.GetData(param)
    res = Curl.Request(TongJi.Url+'ReportService/getData', dataStr, 'POST')
    return TongJi.__Result(res)

  # 趋势分析
  def Trend(params: dict = {}):
    # 参数
    param = Util.ArrayMerge({
      'method':'trend/time/a',
      'site_id':'',             #应用ID
      'start_date':'',          #开始日期
      'end_date':'',            #结束日期
      'metrics':'pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio,avg_trans_cost,income',
      'gran':'default',         #时间粒度: default/hour/day/week/month/year
      'source':'all',           #来源: all/through/search,0/link/
      'clientDevice':'all',     #设备: all/pc/mobile
      'area':'all',             #地域: all/china/province,1/province,4,90/other
      'visitor':'all',          #访客: all/new/old
    }, params)
    # 请求
    dataStr = TongJi.GetData(param)
    res = Curl.Request(TongJi.Url+'ReportService/getData', dataStr, 'POST')
    return TongJi.__Result(res)
