
# 哈希
class Type:

  # 转换: string、int、float
  def ToType(type: str, val):
    if type == 'string':
      return str(val)
    elif type == 'int':
      return int(val)
    elif type == 'float':
      return float(val)
    else:
      return val

  # Interface 转 String
  def Strval(val):
    return str(val)
