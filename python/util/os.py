# 设备信息
class Os:

  # OS
  def System(user_agent: str):
    if 'Win64' in user_agent or 'Windows NT' in user_agent :
      return 'Windows'
    elif 'Linux' in user_agent :
      return 'Linux'
    elif 'Mac' in user_agent :
      return 'Mac OS'
    elif 'Unix' in user_agent :
      return 'Unix'
    else :
      return 'Other'

  # Browser
  def Browser(user_agent: str):
    if 'MSIE' in user_agent :
      return 'IE'
    elif 'Netscape' in user_agent :
      return 'Netscape'
    elif 'Opera' in user_agent :
      return 'Opera'
    elif 'Firefox' in user_agent :
      return 'Firefox'
    elif 'Chrome' in user_agent :
      return 'Chrome'
    elif 'Safari' in user_agent :
      return 'Safari'
    else :
      return 'Other'