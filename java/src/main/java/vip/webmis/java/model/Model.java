package vip.webmis.java.model;

import vip.webmis.java.Env;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.fastjson.JSON;

public class Model {

  private static DruidDataSource dataSource = null;
  private static Connection conn = null;
  private static boolean state = false;
  private static int flag = 0;
  protected String table = "";
  private int id = 0;
  private String sql_reg = "(?:')|(?:--)|(/\\*(?:.|[\\n\\r])*?\\*/)|(\\b(select|select|update|union|and|or|delete|insert|trancate|char|into|substr|ascii|declare|exec|count|master|into|drop|execute)\\b)";

  /* 过滤-参数值 */
  public static String filter(String str){
    return str.replaceAll(".*([';]+|(--)+).*", "");
  }
  /* 过滤-WHERE */
  public String bindWhere(String where, Map<String, Object> bind){
    String v;
    String lower;
    for(String k : bind.keySet()){
      v = String.valueOf(bind.get(k));
      // 小写、匹配、替换
      lower = v.toLowerCase();
      if(Pattern.compile(sql_reg).matcher(lower).find()){
        System.out.println("SQL过滤: "+v);
        return "";
      }
      where = where.replaceAll(":"+k+":",v.replaceAll(sql_reg,""));
    }
    return where;
  }

  /* 查询-单条 */
  public HashMap<String, Object> findFirst() {
    HashMap<String, Object> params = new HashMap<String, Object>();
    return findFirst(params);
  }
  public HashMap<String, Object> findFirst(HashMap<String, Object> params) {
    if(!params.containsKey("limit")) params.put("limit","0,1");
    String sql = this._getSql("SELECT", params);
    if(sql=="") return null;
    return fetchOne(sql);
  }

  /* 查询-多条 */
  public HashMap<String, Object> find() {
    HashMap<String, Object> params = new HashMap<String, Object>();
    return findFirst(params);
  }
  public ArrayList<HashMap<String, Object>> find(HashMap<String, Object> params) {
    String sql = this._getSql("SELECT", params);
    if(sql=="") return null;
    return fetchAll(sql);
  }

  /* 统计条数 */
  public int count() {
    HashMap<String, Object> params = new HashMap<String, Object>();
    return count(params);
  }
  public int count(HashMap<String, Object> params) {
    params.put("columns","count(*) as total");
    String sql = this._getSql("SELECT", params);
    if(sql=="") return 0;
    HashMap<String, Object> data = fetchOne(sql);
    return Integer.parseInt(data.get("total").toString());
  }

  /* 新增 */
  public int insert(HashMap<String, Object> params) {
    String keys = "";
    String vals = "";
    for (String k : params.keySet()){
      keys += "`" + k + "`,";
    }
    for (Object v : params.values()){
      vals += v!=null&&v!="null"?"\""+filter(String.valueOf(v))+"\",":String.valueOf(v)+",";
    }
    keys = keys.substring(0, keys.length()-1);
    vals = vals.substring(0, vals.length()-1);
    String sql = String.format("INSERT INTO %s(%s) values(%s)", this.table, keys, vals);
    sqlCommit("insert",sql);
    return id;
  }

  /* 更新 */
  public boolean update(HashMap<String, Object> params) {
    // 是否数据
    if(!params.containsKey("data")){
      System.out.println("请传入更新数据!");
      return false;
    }
    // 是否WHERE
    if(!params.containsKey("where") || params.get("where").equals("")){
      System.out.println("必需传入Where条件!");
      return false;
    }
    // 过滤WHERE
    String where = String.valueOf(params.get("where"));
    if(params.containsKey("bind")){
      Map<String, Object> bind = JSON.parseObject(JSON.toJSONString(params.get("bind")));
      where = bindWhere(where,bind);
      if(where=="") return false;
    }
    // 组合SQL
    String vals = "";
    Map<String, Object> data = JSON.parseObject(JSON.toJSONString(params.get("data")));
    for (String k : data.keySet()){
      vals += k + "=\"" + filter(String.valueOf(data.get(k))) + "\",";
    }
    vals = vals.substring(0, vals.length()-1);
    String sql = String.format("UPDATE `%s` SET %s WHERE %s", this.table, vals, where);
    return sqlCommit("update",sql);
  }

  /* 删除 */
  public boolean delete(HashMap<String, Object> params) {
    // 是否WHERE
    if(!params.containsKey("where") || params.get("where").equals("")){
      System.out.println("必需传入Where条件!");
      return false;
    }
    // 过滤WHERE
    String where = String.valueOf(params.get("where"));
    if(params.containsKey("bind")){
      Map<String, Object> bind = JSON.parseObject(JSON.toJSONString(params.get("bind")));
      where = bindWhere(where,bind);
      if(where=="") return false;
    }
    // 组合SQL
    String sql = String.format("DELETE FROM `%s` WHERE %s", this.table, where);
    return sqlCommit("delete",sql);
  }

  /* 提交 */
  private boolean sqlCommit(String type, String sql) {
    try {
      // 自动提交
      if (state) {
        if(conn==null || conn.isClosed()) conn = connect();
        conn.setAutoCommit(false);
        Statement _st = conn.createStatement();
        _st.executeUpdate(sql);
        _st.close();
      } else {
        Connection _cn = connect();
        _cn.setAutoCommit(true);
        // 自增ID
        if(type=="insert"){
          PreparedStatement _st = _cn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
          _st.executeUpdate();
          ResultSet _rs = _st.getGeneratedKeys();
          id = _rs.next()?_rs.getInt(1):0;
          _rs.close();
          _st.close();
        }else{
          Statement _st = _cn.createStatement();
          _st.executeUpdate(sql);
          _st.close();
        }
        _cn.close();
      }
      return true;
    } catch (SQLException e) {
      flag++;
      System.out.println("执行失败: " + e.getMessage());
      return false;
    }
  }

  /* 组合SQL */
  private String _getSql(String type, HashMap<String, Object> params) {
    // 参数
    String columns = params.containsKey("columns")?String.valueOf(params.get("columns")):"*";
    String table = params.containsKey("table")?String.valueOf(params.get("table")):this.table;
    // SQL
    String sql = String.format("%s %s FROM %s", type, columns, table);
    // Where
    if(params.containsKey("where")){
      // 过滤WHERE
      String where = String.valueOf(params.get("where"));
      if(params.containsKey("bind")){
        Map<String, Object> bind = JSON.parseObject(JSON.toJSONString(params.get("bind")));
        where = bindWhere(where,bind);
        if(where=="") return "";
      }
      sql += " WHERE "+where;
    }
    // Group、Order、limit
    if(params.containsKey("group")) sql += " GROUP BY "+String.valueOf(params.get("group"));
    if(params.containsKey("order")) sql += " ORDER BY "+String.valueOf(params.get("order"));
    if(params.containsKey("limit")) sql += " LIMIT "+String.valueOf(params.get("limit"));
    return sql;
  }

  /* 查询-单条 */
  public HashMap<String, Object> fetchOne(String sql) {
    HashMap<String, Object> map = new HashMap<String, Object>();
    Connection _cn = connect();
    try {
      Statement _st = _cn.createStatement();
      ResultSet _rs = _st.executeQuery(sql);
      ResultSetMetaData data = _rs.getMetaData();
      int num = data.getColumnCount();
      if(_rs.next()){
        for(int i = 1; i <= num; i++) map.put(data.getColumnLabel(i), _rs.getObject(i));
      }
      // 关闭
      _rs.close();
      _st.close();
      _cn.close();
    } catch (SQLException e) {
      System.out.println(sql);
      System.out.println("查询[单条]: " + e.getMessage());
    }
    return map;
  }

  /* 查询-全部 */
  public ArrayList<HashMap<String, Object>> fetchAll(String sql) {
    ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
    Connection _cn = connect();
    try {
      Statement _st = _cn.createStatement();
      ResultSet _rs = _st.executeQuery(sql);
      ResultSetMetaData data = _rs.getMetaData();
      int num = data.getColumnCount();
      while (_rs.next()) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        for (int i = 1; i <= num; i++) map.put(data.getColumnLabel(i), _rs.getObject(i));
        list.add(map);
      }
      // 关闭
      _rs.close();
      _st.close();
      _cn.close();
    } catch (SQLException e) {
      System.out.println(sql);
      System.out.println("查询[全部]: " + e.getMessage());
    }
    return list;
  }

  /* 事务 */
  public void begin() {
    state = true;
  }
  public void commit() {
    state = false;
    try {
      if(flag>0) conn.rollback();
      conn.commit();
      conn.close();
    } catch (SQLException e) {
      System.out.println("提交失败: " + e.getMessage());
    }
  }

  /* 链接 */
  private Connection connect() {
    try {
      if(dataSource==null){
        HashMap<String,Object> conf = Env.db();
        dataSource = new DruidDataSource();
        dataSource.setUrl("jdbc:"+(String)conf.get("jdbc"));
        dataSource.setUsername((String)conf.get("user"));
        dataSource.setPassword((String)conf.get("password"));
        dataSource.setDriverClassName((String)conf.get("driver"));
        dataSource.setInitialSize((int)conf.get("initialSize"));
        dataSource.setMaxActive((int)conf.get("maxActive"));
        // 防止过期
        dataSource.setValidationQuery("SELECT 1");
        dataSource.setTestWhileIdle(true);
        dataSource.setTestOnBorrow(true);
        dataSource.setTestOnReturn(true);
        // 空闲检测(毫秒)
        dataSource.setTimeBetweenEvictionRunsMillis(60000);
        // 等待超时(毫秒)
        dataSource.setMaxWait(60000);
      }
      return (Connection) dataSource.getConnection();
    } catch (SQLException e) {
      System.out.println("链接数据库: "+e.getMessage());
      return conn;
    }
  }

  /* 关闭-放回连接池 */
  public void close() {
    if(conn!=null) {
      try {
        conn.close();
        conn = null;
      } catch (SQLException e) {
        System.out.println("关闭: "+e.getMessage());
      }
    }
  }
  
}
