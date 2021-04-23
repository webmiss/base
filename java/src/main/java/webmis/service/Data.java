package webmis.service;

import java.util.Random;

import webmis.config.Env;
import webmis.library.Redis;

/* 数据类 */
public class Data extends Base {

  static long id = 0;           //自增ID
  static long idShift = 16;     //自增数位数
  static long saltShift = 8;    //随机数移位
  static long saltBit = 8;      //随机数位数

  /* 生成ID */
  public static long GetId(String name) {
    // 获取
    Redis redis = new Redis("");
    String _id = redis.Get(name);
    Data.id = _id==null?0:Long.valueOf(_id);
    Data.id++;
    // 随机数
    Random random = new Random();
    long randA = random.nextInt(255);
    long randB = random.nextInt(255);
    long mist = (Data.id << Data.idShift) | (randA << Data.saltShift) | randB;
    // 保存
    redis.Set(name, String.valueOf(Data.id));
    redis.Close();
    return mist;
  }
  
  /* 图片地址 */
  public static String Img(Object img) {
    String str = String.valueOf(img);
    return !str.equals("")?Env.base_url+str:"";
  }

}
