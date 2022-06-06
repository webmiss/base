## 引入
```java
import webmis.util.Util;
```

## 执行Linux命令
```java
Util.Exec(String cmd);
```

## 字符串长度
```java
Util.Len(String val);
```

## 格式化时间
```java
Util.Date(
  String format,    //yyyy-MM-dd HH:mm:ss
  String timestamp, //0
);
Util.DateFormat(
  String format,    //格式: yyyy-MM-dd HH:mm:ss
  String duration,  //-1d: 年(y)、月(m)、周(w)、日(d)、时(h)、分(i)、秒(s)
);
```

## 时间戳
```java
Util.Time();
```

## 日期转时间戳
```java
Util.StrToTime(String day);
Util.StrToTime(String day, String format);
```

## Gmt时间格式
```java
Util.GmtISO8601(long timestamp);
```

## 去首尾空格
```java
Util.Trim(String str);
Util.Trim(String str, String charlist);
```

## 拆分字符串为数组
```java
Util.Explode(String delimiter, String string);
```

## 数组合成字符串
```java
Util.Implode(String glue, ArrayList<String> pieces);
Util.Implode(String glue, JSONArray pieces);
```

## Json转换
```java
// 编码
Util.JsonEncode(Object arr);
// 解码
Util.JsonDecode(String str);
Util.JsonDecodeArray(String str);
```

## 合并数组
```java
Util.ArrayMerge(HashMap<String, Object>... arrays);
```
