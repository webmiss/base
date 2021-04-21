package webmis.service;

import webmis.config.Env;

/* 数据类 */
public class Data {

  /* 生成ID */
  public static String GetId() {
    return "2012";
  }
  
  /* 图片地址 */
  public static String Img(Object img) {
    String str = String.valueOf(img);
    return !str.equals("")?Env.base_url+str:"";
  }

}
