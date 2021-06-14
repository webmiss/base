package webmis.util;

/* 类型转换 */
public class Type {

  /* 转换: string、int、float */
  static public Object ToType(String type, Object val) {
    switch(type) {
      case "string":
        return String.valueOf(val);
      case "int":
        return Integer.valueOf(String.valueOf(val));
      case "float":
        return Float.valueOf(String.valueOf(val));
      default :
        return val;
    }
  }
  
}
