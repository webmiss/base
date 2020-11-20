package vip.webmis.java.model;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.regex.Pattern;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import vip.webmis.java.Env;
import vip.webmis.java.common.Base;

public class Model extends Base {

  private static DruidDataSource __dataSource = null; //数据源
  private static Connection __conn = null;  //链接
  private static Boolean __rollback = false;  //回滚
  private static int __flag = 0;  //记录错误
  private String __id = "id"; //主键
  private int __idVal = 0; //自增ID
  private String __table = this.getClass().getSimpleName().toLowerCase(); //数据表
  private String __columns = "*";  //字段
  private String __where = "";  //条件
  private String __group = "";  //分组
  private String __order = "";  //排序
  private String __limit = "";  //限制
  private String __sql = "";  //单条SQL
  private JSONObject __fields = new JSONObject(); //字段&数据
  private String sql_reg = "(?:')|(?:--)|(/\\*(?:.|[\\n\\r])*?\\*/)|(\\b(select|select|update|union|and|or|delete|insert|trancate|char|into|substr|ascii|declare|exec|count|master|into|drop|execute)\\b)";

  /* 设置主键 */
  public void setPrimaryKey(String name) { __id=name; }
  /* 设置数据表 */
  public void setSource(String name) { __table=name; }

  /* 链接 */
  private Connection __connect() {
    try {
      if(__dataSource==null){
        HashMap<String,Object> conf = Env.db();
        __dataSource = new DruidDataSource();
        __dataSource.setUrl("jdbc:"+(String)conf.get("jdbc"));
        __dataSource.setUsername((String)conf.get("user"));
        __dataSource.setPassword((String)conf.get("password"));
        __dataSource.setDriverClassName((String)conf.get("driver"));
        __dataSource.setInitialSize((int)conf.get("initialSize"));
        __dataSource.setMaxActive((int)conf.get("maxActive"));
        // 防止过期
        __dataSource.setValidationQuery("SELECT 1");
        __dataSource.setTestWhileIdle(true);
        __dataSource.setTestOnBorrow(true);
        __dataSource.setTestOnReturn(true);
        // 空闲检测(毫秒)
        __dataSource.setTimeBetweenEvictionRunsMillis(60000);
        // 等待超时(毫秒)
        __dataSource.setMaxWait(60000);
      }
      return (Connection) __dataSource.getConnection();
    } catch (Exception e) {
      System.out.println("链接数据库: "+e.getMessage());
      return __conn;
    }
  }

  /* 返回SQL */
  public String getSql(){ return __sql; }

  /* 查询-单条 */
  public HashMap<String,Object> findFirst() {
    __limit = "0,1";  //限制
    __getSelect(); //生成SQL
    // 执行
    JSONObject res = executeQuery(__sql);
    HashMap<String,Object> data = new HashMap<String,Object>();
    if(res.get("state").equals(true)){
      JSONArray list = JSON.parseArray(JSON.toJSONString(res.get("list")));
      JSONObject tmp = JSON.parseObject(JSON.toJSONString(list.get(0)));
      for(String key : tmp.keySet()) data.put(key,tmp.get(key));
    }
    return data;
  }
  /* 查询-多条 */
  public ArrayList<HashMap<String,Object>> find() {
    __getSelect(); //生成SQL
    // 执行
    JSONObject res = executeQuery(__sql);
    ArrayList<HashMap<String,Object>> data = new ArrayList<HashMap<String,Object>>();
    if(res.get("state").equals(true)){
      JSONObject json;
      HashMap<String,Object> tmp;
      JSONArray list = JSON.parseArray(JSON.toJSONString(res.get("list")));
      for(int i=0; i<list.size(); i++){
        json = JSON.parseObject(JSON.toJSONString(list.get(i)));
        tmp = new HashMap<String,Object>();
        for(String key : json.keySet()) tmp.put(key,json.get(key));
        data.add(tmp);
      }
    }
    return data;
  }
  /* 统计条数 */
  public int count() {
    String sql = String.format("SELECT count(*) as total FROM %s", __table);
    if(__where!="") sql += " WHERE "+__where;
    // 执行
    JSONObject res = executeQuery(sql);
    int total = 0;
    if(res.get("state").equals(true)){
      JSONArray list = JSON.parseArray(JSON.toJSONString(res.get("list")));
      total = Integer.parseInt(JSON.parseObject(JSON.toJSONString(list.get(0))).get("total").toString());
    }
    return total;
  }
  /* 查询-生成 */
  public void __getSelect(){
    String sql = String.format("SELECT %s FROM %s", __columns, __table);
    if(__where!="") sql += " WHERE "+__where;
    if(__group!="") sql += " GROUP BY "+__group;
    if(__order!="") sql += " ORDER BY "+__order;
    if(__limit!="") sql += " LIMIT "+__limit;
    __sql = sql;
  }

  /* 新增 */
  public Boolean create() {
    __sql = ""; //默认SQL
    __getAllFields(); //全部字段
    __callback("beforeCreate",__fields);  //回调函数
    // 组合
    String keys = "";
    String vals = "";
    for(String k : __fields.keySet()){
      keys += "`"+k+"`,";
      if(k==__id && __fields.get(__id).equals(0)){
        vals += "null,";
      }else{
        vals += !__fields.get(k).equals("null")?"\""+filter(String.valueOf(__fields.get(k)))+"\",":"null,";
      }
    }
    keys = keys.substring(0, keys.length()-1);
    vals = vals.substring(0, vals.length()-1);
    __sql = String.format("INSERT INTO `%s`(%s) values(%s)", this.__table, keys, vals);
    // 执行
    JSONObject res = executeQuery(__sql);
    return res.get("state").equals(true)?true:false;
  }
  /* 获取自增ID */
  public int getLastID() {
    return __idVal;
  }

  /* 更新 */
  public Boolean update() {
    __sql = ""; //默认SQL
    __callback("beforeUpdate",__fields);  //回调函数
    if(__fields.isEmpty()) System.out.println("更新错误: 必须指定 uField 字段!");
    // 组合
    String v;
    String vals = "";
    for (String k : __fields.keySet()){
      v = String.valueOf(__fields.get(k));
      vals += v!="null"?k+"=\""+filter(v)+"\",":k+"="+v+",";
    }
    vals = vals.substring(0, vals.length()-1);
    __sql = String.format("UPDATE `%s` SET %s WHERE %s", this.__table, vals, __where);
    // 执行
    JSONObject res = executeQuery(__sql);
    return res.get("state").equals(true)?true:false;
  }
  /* 指定更新字段 */
  public Model uField(String field) {
    __getAllFields(); //全部字段
    JSONObject fields = new JSONObject();
    String[] arr = field.split(",");
    for(String k : __fields.keySet()){
      if(Arrays.asList(arr).contains(k)) fields.put(k,__fields.get(k));
    }
    __fields = fields;
    return this;
  }

  /* 删除 */
  public Boolean delete() {
    __sql = ""; //默认SQL
    __callback("beforeDelete");  //回调函数
    __sql = String.format("DELETE FROM `%s` WHERE %s", __table, __where);
    // 执行
    JSONObject res = executeQuery(__sql);
    return res.get("state").equals(true)?true:false;
  }

  /* Where 条件 */
  public Model where(String where) throws Exception {
    JSONObject bind = new JSONObject();
    return where(where,bind);
  }
  public Model where(String where, JSONObject bind) throws Exception {
    // 过滤WHERE
    if(!bind.isEmpty()) where = bindWhere(where,bind);
    if(where=="") error("Where不能为空!");
    __where = where;
    return this;
  }
  /* Table 数据表 */
  public Model table(String str) {
    __table = str;
    return this;
  }
  /* Columns 字段 */
  public Model columns(String str) {
    __columns = str;
    return this;
  }
  /* Group 分组 */
  public Model group(String str) {
    __group = str;
    return this;
  }
  /* Order 排序 */
  public Model order(String str) {
    __order = str;
    return this;
  }
  /* Limit 限制 */
  public Model limit(String str) {
    __limit = str;
    return this;
  }
  /* 过滤-参数值 */
  public static String filter(Object v){
    return v.toString().replaceAll(".*([';]+|(--)+).*", "");
  }
  /* 过滤-WHERE */
  public String bindWhere(String where, JSONObject bind){
    String v;
    String lower;
    for(String k : bind.keySet()){
      v = String.valueOf(bind.get(k));
      // 小写、匹配、替换
      lower = v.toLowerCase();
      if(!Pattern.compile(sql_reg).matcher(lower).find()){
        where = where.replaceAll(":"+k+":",v.replaceAll(sql_reg,""));
      }else{
        System.out.println("SQL过滤: "+v); return "";
      }
    }
    return where;
  }

  /* 事务-回滚 */
  public void begin() { __rollback = true; }
  public void commit() {
    __rollback = false;
    try {
      if(__flag>0) __conn.rollback();
      __conn.commit();
      __conn.close();
    } catch (SQLException e) {
      System.out.println("回滚失败: "+e.getMessage());
    }
  }

  /* 执行SQL */
  public JSONObject executeQuery(String sql){
    JSONObject bind = new JSONObject();
    return executeQuery(sql,bind);
  }
  public JSONObject executeQuery(String sql, JSONObject bind){
    JSONObject res = new JSONObject();
    int num = 0;
    // 过滤SQL
    if(!bind.isEmpty()) sql = bindWhere(sql,bind);
    try {
      // 回滚
      if(__rollback){
        if(__conn==null || __conn.isClosed()) __conn = __connect();
        __conn.setAutoCommit(false);
      }else{
        __conn = __connect();
        __conn.setAutoCommit(true);
      }
      // 类型
      String type = sql.substring(0,1).toLowerCase();
      if(type.equals("s")){
        // 查询
        JSONArray list = new JSONArray();
        Statement _st = __conn.createStatement();
        ResultSet _rs = _st.executeQuery(sql);
        ResultSetMetaData data = _rs.getMetaData();
        int n = data.getColumnCount();
        while (_rs.next()) {
          JSONObject map = new JSONObject();
          for (int i = 1; i<=n; i++) map.put(data.getColumnLabel(i), _rs.getObject(i));
          list.add(map);
          num++;
        }
        // 关闭
        _rs.close();
        _st.close();
        // 结果
        res = new JSONObject();
        res.put("state",num>0?true:false);
        res.put("num",num);
        res.put("list",list);
      }else if(type.equals("i")){
        PreparedStatement _st = __conn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
        num = _st.executeUpdate();
        ResultSet _rs = _st.getGeneratedKeys();
        __idVal = _rs.next()?_rs.getInt(1):0;
        _rs.close();
        _st.close();
        // 结果
        res = new JSONObject();
        res.put("state",num>0?true:false);
        res.put("num",num);
        res.put("id",__idVal);
      }else{
        Statement _st = __conn.createStatement();
        num = _st.executeUpdate(sql);
        _st.close();
        // 结果
        res = new JSONObject();
        res.put("state",true);
        res.put("num",num);
      }
      // 关闭链接
      if(!__rollback) __conn.close();
    } catch (SQLException e) {
      __flag++;
      System.out.println("执行失败: "+e.getMessage());
      System.out.println(sql);
      res = new JSONObject();
      res.put("state",false);
      res.put("msg",e.getMessage());
    }
    return res;
  }
  
  /* 验证&取值 */
  private void __getAllFields(){
    __fields = new JSONObject();
    String name;
    String mName;
    Method method;
    Object res;
    try {
      // 类
      Object obj = this.getClass().getDeclaredConstructor().newInstance();
      // 字段
      Field[] fields = this.getClass().getDeclaredFields();
      ArrayList<String> methods = _getMethod();
      for (Field field : fields) {
        name = field.getName();
        mName = name.substring(0,1).toUpperCase()+name.substring(1);
        // 设置
        if(methods.contains("set"+mName)){
          method = this.getClass().getMethod("set"+mName,field.get(this).getClass());
          method.invoke(obj,field.get(this));
        }
        // 获取
        if(methods.contains("get"+mName)){
          method = this.getClass().getMethod("get"+mName);
          res = method.invoke(obj);
          __fields.put(name,res);
        }else{
          __fields.put(name,field.get(this));
        }
      }

    } catch (Exception e) {
      System.out.println("模型错误: "+e.getMessage());
    }
  }
  /* 获取全部函数 */
  private ArrayList<String> _getMethod(){
    ArrayList<String> list = new ArrayList<String>();
    Method[] methods = this.getClass().getDeclaredMethods();
    for(Method method : methods){
      list.add(method.getName());
    }
    return list;
  }
  /* 回调函数 */
  private void __callback(String name){
    __callback(name, new JSONObject());
  }
  private void __callback(String name, JSONObject fields){
    ArrayList<String> methods = _getMethod();
    if(methods.contains(name)){
      try{
        Object obj = this.getClass().getDeclaredConstructor().newInstance();
        Method method = this.getClass().getMethod(name,JSONObject.class);
        __fields = (JSONObject)method.invoke(obj,fields);
      } catch (Exception e) {}
    }
  }
  
}
