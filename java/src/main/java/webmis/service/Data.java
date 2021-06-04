package webmis.service;

import java.util.Date;
import java.util.Random;

import webmis.config.Env;
import webmis.library.Redis;

/* 数据类 */
public class Data extends Base {

  static long autoId = 0;     //自增ID
  static long max8bit = 8;    //随机数位数

  static long machineId = 1;  //机器标识
  static long max10bit = 10;  //机器位数
  static long max12bit = 12;  //序列数位数

  /* 薄雾算法 */
  public static long Mist(String redisName) {
    // 获取
    Redis redis = new Redis("");
    Data.autoId = redis.Incr(redisName);
    redis.Close();
    // 随机数
    Random random = new Random();
    long randA = random.nextInt(255);
    long randB = random.nextInt(255);
    // 位运算
    long mist = (Data.autoId << (Data.max8bit + Data.max8bit) | (randA << Data.max8bit) | randB);
    return mist;
  }

  /* 雪花算法 */
  public static long Snowflake() {
    // 时间戳
    long t = new Date().getTime();
    // 随机数
    Random random = new Random();
    long rand = random.nextInt(4095);
    // 位运算
    long mist = (t << (Data.max10bit + Data.max12bit) | (Data.machineId << Data.max12bit) | rand);
    return mist;
  }
  
  /* 图片地址 */
  public static String Img(Object img) {
    String str = String.valueOf(img);
    return !str.equals("")?Env.base_url+str:"";
  }

}
