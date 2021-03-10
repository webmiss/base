import time

def date(format: str = '%Y-%m-%d %H:%M:%S', t: str = None):
  t = time.localtime(t)
  return time.strftime(format,t)