from math import floor
import random
from config.env import Env
from library.redis import Redis

# 数据类
class Data:

  id: int = 0           #自增ID
  idShift: int = 16     #自增数位数
  saltShift: int = 8    #随机数移位
  saltBit: int = 8      #随机数位数

  # 生成ID
  def GetId(name: str):
    # 获取
    redis = Redis()
    _id = redis.Get(name)
    Data.id = 0 if not _id else int(_id)
    Data.id += 1
    # 随机数
    randA = random.randint(0,255)
    randB = random.randint(0,255)
    # 位运算
    mist = int((Data.id << Data.idShift) | (randA << Data.saltShift) | randB)
    # 保存
    redis.Set(name, Data.id)
    redis.Close()
    return mist

  # 图片地址
  def Img(img: str):
    return Env.base_url+img if img!='' else ''