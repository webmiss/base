import hashlib, hmac, binascii

# 哈希
class Hash:

  # Md5
  def Md5(data: str):
    return hashlib.md5(data.encode(encoding='utf-8')).hexdigest()

  # Sha256
  def Sha256(data: str):
    return hashlib.sha256(data.encode(encoding='utf-8')).hexdigest()

  # HmacSha1
  def HmacSha1(data: str, key: bytes):
    return hmac.new(key, str.encode(data), hashlib.sha1).digest()

  # HmacSha256
  def HmacSha256(data: str, key: bytes):
    return hmac.new(key, str.encode(data), hashlib.sha256).digest()

  # Bytes转为16进制
  def HexEncode(byte: bytes):
    return binascii.b2a_hex(byte).decode('utf-8')
