from math import floor
import time
import random
from config.env import Env
from library.redis import Redis

# 数据类
class Data:

  # 机器标识
  machineId: int = Env.machine_id
  max8bit: int = 8     #随机数位数
  max10bit: int = 10   #机器位数
  max12bit: int = 12   #序列数位数

  # 薄雾算法
  def Mist(redisName: str):
    # 自增ID
    redis = Redis()
    autoId = redis.Incr(redisName)
    redis.Close()
    # 随机数
    randA = random.randint(0,255)
    randB = random.randint(0,255)
    # 位运算
    mist = int((autoId << (Data.max8bit + Data.max8bit)) | (randA << Data.max8bit) | randB)
    return mist

  # 雪花算法
  def Snowflake():
    # 时间戳
    t = int(round(time.time() * 1000))
    # 随机数
    rand = random.randint(0,4095)
    # 位运算
    mist = int((t << (Data.max10bit + Data.max12bit)) | (Data.machineId << Data.max12bit) | rand)
    return mist

  # 图片地址
  def Img(img: str):
    return Env.base_url+img if img!='' else ''