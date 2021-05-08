import hashlib

# 加密
class Hmac:

  # Md5
  def Md5(data: str):
    return hashlib.md5(str.encode(encoding='utf-8')).hexdigest()

