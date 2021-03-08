package webmis.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import webmis.base.Base;
import webmis.config.Db;

/* 数据库 */
public class Model extends Base {

  private final String _url = "jdbc:mysql://"+Db.Host+":"+Db.Port+"/"+Db.Database+"?characterEncoding="+Db.Charset+"&useSSL=false&serverTimezone=Asia/Shanghai";
  private Connection _conn = null;           //链接
  private String _sql = "";                  //SQL
  private String _table = "";                //数据表
  private String _columns = "";              //字段
  private String _where = "";                //条件
  private String _group = "";                //分组
  private String _order = "";                //排序
  private String _limit = "";                //限制
  private PreparedStatement _bind = null;    //参数
  private String _keys = "";                 //新增-名
  private String _values = "";               //新增-值
  private String _data = "";                 //更新-数据

  /* 链接数据库 */
  public Connection Conn() {
    try {
      if(_conn != null && !_conn.isClosed()) return _conn;
      _conn = DriverManager.getConnection(_url, Db.User, Db.Password);
    } catch (SQLException e) {
      Print("[Model] Conn:"+e.getMessage());
    }
    return _conn;
  }

  /* 关闭 */
  public void Close() {
    try {
      _conn.close();
    } catch (SQLException e) {
      Print("[Model] Close:"+e.getMessage());
    }
  }

  /* 过滤 */
  public PreparedStatement Bind(String sql) {
    // 连接
    if(Conn()==null) return _bind;
    try {
      _bind = _conn.prepareStatement(sql);
    } catch (SQLException e) {
      Print("[Model] Bind:"+e.getMessage());
    }
    return _bind;
  }

  /* 查询 */
  public ResultSet Query(PreparedStatement pst){
    ResultSet rs;
    try {
      rs = pst.executeQuery();
      return rs;
    } catch (SQLException e) {
      Print("[Model] Query:"+e.getMessage());
      return null;
    }
  }

  /* 获取-SQL */
  public String GetSql() {
    return _sql;
  }

  /* 表 */
  public void Table(String table) {
    _table = table;
  }
  /* 关联-INNER */
  public void Join(String table, String on) {
    _table += " INNER JOIN " + table + " ON " + on;
  }
  /* 关联-LEFT */
  public void LeftJoin(String table, String on) {
    _table += " LEFT JOIN " + table + " ON " + on;
  }
  /* 关联-RIGHT */
  public void RightJoin(String table, String on) {
    _table += " RIGHT JOIN " + table + " ON " + on;
  }
  /* 关联-FULL */
  public void FullJoin(String table, String on) {
    _table += " FULL JOIN " + table + " ON " + on;
  }
  /* 字段 */
  public void Columns(String... columns) {
    _columns = "";
    for(int i=0; i<columns.length; i++){
      _columns += columns[i] + ", ";
    }
    _columns = _columns.substring(0,_columns.length()-2);
  }
  /* 条件 */
  public void Where(String where) {
    _where = where;
  }
  /* 限制 */
  public void Limit(int start, int limit) {
    _limit = String.valueOf(start) + "," + String.valueOf(limit);
  }
  /* 排序 */
  public void Order(String... order) {
    _order = "";
    for(int i=0; i<order.length; i++){
      _order += order[i] + ",";
    }
    _order = _order.substring(0,_order.length()-1);
  }
  /* 分组 */
  public void Group(String... group) {
    _group = "";
    for(int i=0; i<group.length; i++){
      _group += group[i] + ",";
    }
    _group = _group.substring(0,_order.length()-1);
  }

  /* 分页 */
  public void Page(int page, int limit) {
    int start = (page - 1) * limit;
    _limit = String.valueOf(start) + "," + String.valueOf(limit);
  }

  /* 查询-SQL */
  public String SelectSql() {
    if(_table.equals("") || _columns.equals("")){
      Print("[Model] Select: 数据表、字段不能为空!");
      return "";
    }
    // 合成
    _sql = "SELECT " + _columns + " FROM " + _table;
    if(!_where.equals("")){
      _sql += " WHERE "+_where;
      _where = "";
    }
    if(!_order.equals("")){
      _sql += " ORDER BY "+_order;
      _order = "";
    }
    if(!_group.equals("")){
      _sql += " GROUP BY "+_group;
      _group = "";
    }
    if(!_limit.equals("")){
      _sql += " LIMIT "+_limit;
      _limit = "";
    }
    return _sql;
  }
  /* 查询-多条 */
  public ArrayList<HashMap<String,Object>> Find(PreparedStatement pst) {
    return FindDataAll(pst);
  }
  /* 查询-单条 */
  public HashMap<String,Object> FindFirst(PreparedStatement pst) {
    HashMap<String,Object> res = new HashMap<String,Object>();
    ArrayList<HashMap<String,Object>> data = FindDataAll(pst);
    if(data.size()>0) return data.get(0);
    return res;
  }
  /* 获取查询结果 */
  public ArrayList<HashMap<String,Object>> FindDataAll(PreparedStatement pst) {
    ArrayList<HashMap<String,Object>> res = new ArrayList<HashMap<String,Object>>();
    HashMap<String,Object> tmp ;
    ResultSetMetaData data;
    int num = 0;
    try {
      ResultSet rs = pst.executeQuery();
      data = rs.getMetaData();
      int n = data.getColumnCount();
      while (rs.next()) {
        tmp = new HashMap<String,Object>();
        for (int i = 1; i<=n; i++) tmp.put(data.getColumnLabel(i), rs.getObject(i));
        res.add(tmp);
        num++;
      }
      // 释放
      rs.close();
      pst.close();
    } catch (SQLException e) {
      Print("[Model] Find: "+e.getMessage());
    }
    return res;
  }

}
