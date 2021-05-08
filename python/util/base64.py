import base64
import zlib

class Base64:

  # 编码
  def Encode(data: str):
    return base64.b64encode(data)

  # 解码
  def Decode(data: bytes):
    return base64.b64decode(data)

  # 编码(URL)
  def UrlEncode(data: bytes):
    # 编码
    res = bytes.decode(base64.b64encode(data))
    # 替换
    replace = {'+':'*', '/':'-', '=':'_'}
    for k,v in replace.items() :
      res = res.replace(k,v)
    return res

  # 解码(URL)
  def UrlDecode(data: str):
    # 替换
    replace = {'*':'+', '-':'/', '_':'='}
    for k,v in replace.items() :
      data = data.replace(k,v)
    # 解码
    return base64.b64decode(data)

  # 压缩
  def Compress(data: str):
    return zlib.compress(str.encode(data))

  # 解压
  def UnCompress(data: bytes):
    return zlib.decompress(data)
