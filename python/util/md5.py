import hashlib

def md5(str: str):
  return hashlib.md5(str.encode(encoding='utf-8')).hexdigest()