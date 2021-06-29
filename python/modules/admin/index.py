import datetime

from config.env import Env
from service.base import Base
from service.data import Data
from service.admin_token import AdminToken
from model.sys_config import SysConfig
from model.logs import Logs
from util.util import Util

class Index(Base):

  # 首页
  def Index(self):
    return self.GetJSON({'code':0,'msg':'Admin'})

  # 系统配置
  def GetConfig(self):
    config = SysConfig()
    config.Columns('name','val')
    config.Where('name in ("title","copy","logo","login_bg")')
    data = config.Find()
    # 数据
    list = {}
    for val in data :
      if val['name']=='logo' or val['name']=='login_bg' :
        list[val['name']] = Data.Img(val['val'])
      else :
        list[val['name']] = val['val']
    return self.GetJSON({'code':0,'msg':'成功', 'list':list})

  # 图表数据
  def GetChart(self):
    # 参数
    json = self.Json()
    token = self.JsonName(json, 'token')
    # 验证
    msg = AdminToken.Verify(token, '')
    if msg != '' : return self.GetJSON({'code':4001, 'msg':msg})
    # 统计图1
    chart1 = []
    day = Util.Date('%Y-%m-%d')
    last1 = (datetime.datetime.now()+datetime.timedelta(days=1)).strftime('%Y-%m-%d')
    last2 = (datetime.datetime.now()+datetime.timedelta(days=-1)).strftime('%Y-%m-%d')
    for i in range(24):
      # 时间
      if i==23 :
        dt1 = day + ' ' + str(i) + ':00:00'
        dt2 = last1 + ' 00:00:00'
        dt3 = last2 + ' ' + str(i) + ':00:00'
        dt4 = day + ' 00:00:00'
      else :
        dt1 = day + ' ' + str(i) + ':00:00'
        dt2 = day + ' ' + str(i+1) + ':00:00'
        dt3 = last2 + ' ' + str(i) + ':00:00'
        dt4 = last2 + ' ' + str(i+1) + ':00:00'
      t1 = Util.Strtotime(dt1)
      t2 = Util.Strtotime(dt2)
      t3 = Util.Strtotime(dt3)
      t4 = Util.Strtotime(dt4)
      # 统计
      m1 = Logs()
      m1.Columns('count(*) as total')
      m1.Where('ctime>=%s AND ctime<%s AND source=%s', t1, t2, Env.log_source)
      d1 = m1.FindFirst()
      chart1 += [{'type':'今日(PV)', 'label':str(i), 'value':int(d1['total'])}]
      m2 = Logs()
      m2.Columns('count(*) as total')
      m2.Where('ctime>=%s AND ctime<%s AND source=%s', t3, t4, Env.log_source)
      d2 = m2.FindFirst()
      chart1 += [{'type':'昨日(PV)', 'label':str(i), 'value':int(d2['total'])}]
    # 统计图1
    chart2 = []
    year = Util.Date('%Y')
    last1 = str(int(year)+1)
    last2 = str(int(year)-1)
    for i in range(12):
      # 时间
      if i==11 :
        dt1 = year + '-' + str(i+1) +'-01'
        dt2 = last1 + '-01-01'
        dt3 = last2 + '-' + str(i+1) + '-01'
        dt4 = year + '-01-01'
      else :
        dt1 = year + '-' + str(i+1) + '-01'
        dt2 = year + '-' + str(i+2) + '-01'
        dt3 = last2 + '-' + str(i+1) + '-01'
        dt4 = last2 + '-' + str(i+2) + '-01'
      t1 = Util.Strtotime(dt1, '%Y-%m-%d')
      t2 = Util.Strtotime(dt2, '%Y-%m-%d')
      t3 = Util.Strtotime(dt3, '%Y-%m-%d')
      t4 = Util.Strtotime(dt4, '%Y-%m-%d')
      # 统计
      m1 = Logs()
      m1.Columns('count(*) as total')
      m1.Where('ctime>=%s AND ctime<%s AND source=%s', t1, t2, Env.log_source)
      d1 = m1.FindFirst()
      chart2 += [{'type':'今年(PV)', 'label':str(i+1), 'value':int(d1['total'])}]
      m2 = Logs()
      m2.Columns('count(*) as total')
      m2.Where('ctime>=%s AND ctime<%s AND source=%s', t3, t4, Env.log_source)
      d2 = m2.FindFirst()
      chart2 += [{'type':last2+'年(PV)', 'label':str(i+1), 'value':int(d2['total'])}]
    # 统计图3
    chart3 = []
    m1 = Logs()
    m1.Columns('count(*) as total')
    m1.Where('source=%s', Env.log_source)
    d1 = m1.FindFirst()
    m2 = Logs()
    m2.Columns('count(*) as total', 'browser')
    m2.Where('source=%s', Env.log_source)
    m2.Group('browser')
    d2 = m2.Find()
    for val in d2:
      ratio = float(int(val['total'])/int(d1['total'])*100)/100
      chart3 += [{'label':val['browser'], 'value': ratio}]
    return self.GetJSON({'code':0,'msg':'成功', 'chart1':chart1, 'chart2':chart2, 'chart3':chart3})
