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
Util.Date(String format);
Util.Date(String format, String timestamp);
```

## 时间戳
```java
Util.Time();
```

## 日期转时间戳
```java
Util.Strtotime(String day);
Util.Strtotime(String day, String format);
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

## JSON转字符串
```java
Util.JsonEncode(Object arr);
```

## JSON字符串转数组
```java
Util.JsonDecode(String str);
Util.JsonDecodeArray(String str);
```

## 合并数组
```java
Util.ArrayMerge(HashMap<String, Object>... arrays);
```
