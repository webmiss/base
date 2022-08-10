from service.base import Base
from service.admin_token import AdminToken
from library.baidu.tong_ji import TongJi
from util.util import Util

class Index(Base):

  __site_id: str = '17669804'

  # 首页
  def Index(self):
    return self.GetJSON({'code':0,'msg':'Python Admin'})

  # 图表数据
  def GetChart(self):
    data = {}
    day = Util.DateFormat('%Y%m%d')
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})

    # 今日流量
    sDate = Util.DateFormat('%Y%m%d', '-1d')
    eDate = day
    res = TongJi.TrendRpt({
      'site_id': self.__site_id,
      'start_date': sDate,
      'end_date': eDate,
      'metrics': 'pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time',
    })
    t1 = res['items'][1][1]
    t2 = res['items'][1][0]
    data['TrendRpt'] = {
      'today': {
        'day': res['items'][0][1][0],
        'pv': t1[0] if t1[0]!='--' else '0',
        'uv': t1[1] if t1[1]!='--' else '0',
        'ip': t1[2] if t1[2]!='--' else '0',
        'ratio': t1[3] if t1[3]!='--' else '0',
        'time': t1[4] if t1[4]!='--' else '0',
      },
      'yesterday': {
        'day': res['items'][0][0][0],
        'pv': t2[0] if t2[0]!='--' else '0',
        'uv': t2[1] if t2[1]!='--' else '0',
        'ip': t2[2] if t2[2]!='--' else '0',
        'ratio': t2[3] if t2[3]!='--' else '0',
        'time': t2[4] if t2[4]!='--' else '0',
      },
    }

    # 趋势分析
    tp = self.JsonName(json, 'type')
    gran = 'day'
    if tp=='t1' :
      gran = 'hour'
      sDate = day
      eDate = day
    elif tp=='t2' :
      gran = 'hour'
      sDate = Util.DateFormat('%Y%m%d', '-1d')
      eDate = sDate
    elif tp=='t3' :
      sDate = Util.DateFormat('%Y%m%d', '-6d')
      eDate = day
    elif tp=='t4' :
      sDate = Util.DateFormat('%Y%m%d', '-29d')
      eDate = day
    res = TongJi.Trend({
      'site_id': self.__site_id,
      'start_date': sDate,
      'end_date': eDate,
      'metrics': 'pv_count,visitor_count,ip_count',
      'gran': gran,
    })
    # 数据
    trend = []
    n = len(res['items'][0])-1
    for i in range(n,-1,-1) :
      if tp=='t1' or tp=='t2':
        label = str(n-i)+'点'
      else:
        label = res['items'][0][i][0]
      # 浏览量(PV)
      value = 0 if res['items'][1][i][0]=='--' else res['items'][1][i][0]
      trend += [{'type':'浏览量(PV)', 'label':label, 'value':value}]
      # 访客数(UV)
      value = 0 if res['items'][1][i][1]=='--' else res['items'][1][i][1]
      trend += [{'type':'访客数(UV)', 'label':label, 'value':value}]
      # IP数
      value = 0 if res['items'][1][i][2]=='--' else res['items'][1][i][2]
      trend += [{'type':'IP数', 'label':label, 'value':value}]
    data['Trend'] = trend

    # 返回
    return self.GetJSON({'code':0,'msg':'成功', 'data':data})
