import hashlib
import hmac

# 加密
class Hmac:

  # Md5
  def Md5(data: str):
    return hashlib.md5(data.encode(encoding='utf-8')).hexdigest()

  # Sha256
  def Sha256(data: str, key: str):
    return hmac.new(str.encode(key), str.encode(data), hashlib.sha256).digest()
