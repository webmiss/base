package webmis.util;

/* 类型转换 */
public class Type {

  /* Int */
  static public int Int(Object val) {
    return Integer.valueOf(String.valueOf(val));
  }

  /* Long */
  static public long Long(Object val) {
    return Long.valueOf(String.valueOf(val));
  }

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
