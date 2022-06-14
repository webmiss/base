import time,datetime,json,os
from dateutil.relativedelta import relativedelta

# 常用工具
class Util:

  # 执行Linux命令
  def Exec(cmd: str):
    res = os.popen(cmd)
    return res.readlines()

  # 格式化时间
  def Date(format: str='%Y-%m-%d %H:%M:%S', timestamp: float=None):
    t = time.localtime(timestamp)
    return time.strftime(format, t)
  def DateFormat(format: str='%Y-%m-%d %H:%M:%S', duration: str='0s'):
    l = int(duration[:-1])
    r = duration[-1:]
    # 年、月、周、日、时、分、秒
    now = datetime.datetime.now()
    if r=='y' : d = now+relativedelta(years=l)
    elif r=='m' : d = now+relativedelta(months=l)
    elif r=='w' : d = now+relativedelta(weeks=l)
    elif r=='d' : d = now+relativedelta(days=l)
    elif r=='h' : d = now+relativedelta(hours=l)
    elif r=='i' : d = now+relativedelta(minutes=l)
    elif r=='s' : d = now+relativedelta(seconds=l)
    else : now+relativedelta(seconds=0)
    return d.strftime(format)

  # 时间戳
  def Time():
    return int(time.time())

  # String To Timestamp
  def StrToTime(day: str=None, format: str='%Y-%m-%d %H:%M:%S'):
    tArr = time.strptime(day, format)
    t = time.mktime(tArr)
    return t if t>0 else 0

  # Timestamp To GmtIso8601
  def GmtISO8601(timestamp: int):
    t = time.localtime(timestamp)
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", t)

  # 去首尾空格
  def Trim(content, charlist: str = None):
    text = str(content)
    return text.strip(charlist)

  # String to List
  def Explode(delimiter: str, string: str):
    return string.split(delimiter)

  # List to String
  def Implode(glue: str, pieces: list):
    return glue.join(pieces)

  # Array to String
  def JsonEncode(data):
    try :
      return json.dumps(data)
    except Exception as e :
      return ''

  # String to Array
  def JsonDecode(data: str):
    try :
      return json.loads(data)
    except Exception as e :
      return []

  # 合并数组
  def ArrayMerge(*arrays: dict):
    res = {}
    for arr in arrays :
      for k,v in arr.items() : res[k] = v
    return res

  # Url to Array
  def UrlToArray(url: str):
    if not url : return {}
    arr = url.split('?')
    path = arr[1] if len(arr)>1 else arr[0]
    arr = path.split('&')
    param = {}
    for v in arr :
      tmp = v.split('=')
      param[tmp[0]] = tmp[1]
    return param
