package webmis.util;

import webmis.config.Env;

/* 数据类 */
public class Data {
  
  /* 图片地址 */
  public static String img(Object img) {
    String str = String.valueOf(img);
    return !str.equals("")?Env.base_url+str:"";
  }

}
