from urllib.parse import quote,unquote

class Url:

  # 编码
  def Encode(data: str):
    return quote(data)

  # 解码
  def Decode(data: str):
    return unquote(data)