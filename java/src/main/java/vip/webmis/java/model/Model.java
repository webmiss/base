package vip.webmis.java.model;

import vip.webmis.java.Env;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import com.alibaba.druid.pool.DruidDataSource;

public class Model {

  private static DruidDataSource dataSource = null;
  private static Connection conn = null;
  private static boolean state = false;
  private static int flag = 0;
  protected String table = "";

  /* 查询-单条 */
  public HashMap<String, Object> findFirst(HashMap<String, Object> params) {
    String sql = this.sql("SELECT", params);
    return fetchOne(sql);
  }

  /* 查询-多条 */
  public ArrayList<HashMap<String, Object>> find(HashMap<String, Object> params) {
    String sql = this.sql("SELECT", params);
    return fetchAll(sql);
  }

  /* 新增 */
  public boolean insert(HashMap<String, Object> params) {
    String keys = "";
    String vals = "";
    for (String k : params.keySet())
      keys += "`" + k + "`,";
    for (Object v : params.values())
      vals += v != null && v != "null" ? "\"" + (String) v + "\"," : (String) v + ",";
    keys = keys.substring(0, keys.length() - 1);
    vals = vals.substring(0, vals.length() - 1);
    String sql = String.format("INSERT INTO %s(%s) values(%s)", this.table, keys, vals);
    return sqlCommit(sql);
  }

  /* 更新 */
  public boolean update(HashMap<String, Object> params, String where) {
    String vals = "";
    for (String k : params.keySet())
      vals += k + "=\"" + (String) params.get(k) + "\",";
    vals = vals.substring(0, vals.length() - 1);
    String sql = String.format("UPDATE `%s` SET %s WHERE %s", this.table, vals, where);
    return sqlCommit(sql);
  }

  /* 删除 */
  public boolean delete(String where) {
    String sql = String.format("DELETE FROM `%s` WHERE %s", this.table, where);
    return sqlCommit(sql);
  }

  /* 提交 */
  private boolean sqlCommit(String sql) {
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
        Statement _st = _cn.createStatement();
        _st.executeUpdate(sql);
        _st.close();
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
  public String sql(String type, HashMap<String, Object> params) {
    // 参数
    String columns = params.get("columns") != null ? (String) params.get("columns") : "*";
    String table = params.get("table") != null ? (String) params.get("table") : this.table;
    // SQL
    String sql = String.format("%s %s FROM %s", type, columns, table);
    if (params.get("where") != null)
      sql += " WHERE " + (String) params.get("where");
    if (params.get("group") != null)
      sql += " GROUP BY " + (String) params.get("group");
    if (params.get("order") != null)
      sql += " ORDER BY " + (String) params.get("order");
    if (params.get("limit") != null)
      sql += " LIMIT " + (String) params.get("limit");
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
      if (_rs.next()) {
        for (int i = 1; i <= num; i++) {
          map.put(data.getColumnLabel(i), _rs.getObject(i));
        }
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
        for (int i = 1; i <= num; i++) {
          map.put(data.getColumnLabel(i), _rs.getObject(i));
        }
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
      System.out.println("链接数据库: %s"+e.getMessage());
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
