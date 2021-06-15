import base64
import zlib

class Base64:

  # String To Bytes
  def ToByte(data: str):
    return str.encode(data)

  # Bytes To String
  def ToStr(data: bytes):
    return bytes.decode(data)

  # 编码
  def Encode(data: bytes):
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

  # 获取后缀
  def GetExt(base64Type: str):
    ext = ''
    if base64Type=='data:image/jpeg;base64' : ext='jpg'
    elif base64Type=='data:image/png;base64' : ext='png'
    elif base64Type=='data:image/gif;base64' : ext='gif'
    return ext
