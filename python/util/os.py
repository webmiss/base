# 设备信息
class Os:

  # OS
  def System(user_agent):
    if 'win' in user_agent or 'Win' in user_agent :
      return 'Windows'
    elif 'linux' in user_agent or 'Linux' in user_agent :
      return 'Linux'
    elif 'Mac' in user_agent :
      return 'MacOS'
    elif 'unix' in user_agent or 'Unix' in user_agent or 'BSD' in user_agent or 'HPUX' in user_agent :
      return 'Unix'
    else :
      return 'Other'

  # Browser
  def Browser(user_agent):
    if 'Maxthon' in user_agent or 'MSIE' in user_agent :
      return 'IE'
    elif 'Chrome' in user_agent :
      return 'Chrome'
    elif 'Firefox' in user_agent or 'Mozilla' in user_agent :
      return 'Firefox'
    elif 'Opera' in user_agent :
      return 'Opera'
    elif 'Safari' in user_agent :
      return 'Safari'
    elif 'Netscape' in user_agent :
      return 'Netscape'
    else :
      return 'Other'