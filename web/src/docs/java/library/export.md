## 引入
```java
import webmis.library.Export;
```

## 导出Excel
```java
HashMap<String, Object> params = new HashMap<String, Object>();
param.put("borderColor", "#E2E4E8");      //边框颜色
param.put("titleColor", "#666");          //标题颜色
param.put("titleBgColor", "#F2F2F2");     //标题背景
Export.Excel(ArrayList<ArrayList<Object>> data, HashMap<String, Object> params);
```

## 案例
```java
ArrayList<Object> tmp;
ArrayList<ArrayList<Object>> data = new ArrayList<>();
tmp = new ArrayList<>();
tmp.add("ID");
tmp.add("名称");
data.add(tmp);
tmp = new ArrayList<>();
tmp.add(1);
tmp.add("测试");
data.add(tmp);
String html = Export.Excel(data);
FileEo.Root = Env.root_dir;
FileEo.Writer("upload/"+Util.Date("yyyyMMddHHmmss")+".xlsx", html);
```
