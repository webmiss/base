package webmis.service;

import webmis.config.Env;

/* 数据类 */
public class Data {
  
  /* 图片地址 */
  public static String Img(Object img) {
    String str = String.valueOf(img);
    return !str.equals("")?Env.base_url+str:"";
  }

}
