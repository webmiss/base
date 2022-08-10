package webmis.model;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map.Entry;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.fastjson.JSONArray;

import webmis.service.Base;
import webmis.util.Type;
import webmis.util.Util;
import webmis.config.Db;

/* 数据库 */
public class Model extends Base {

  public static DruidDataSource DBDefault = null;   //默认池
  public static DruidDataSource DBOther = null;     //其它池

  private String _type = "";                        //类型: insert
  private String _sql = "";                         //SQL
  private String _db = "";                          //数据库
  private String _table = "";                       //数据表
  private String _columns = "";                     //字段
  private String _where = "";                       //条件
  private String _group = "";                       //分组
  private String _order = "";                       //排序
  private String _limit = "";                       //限制
  private JSONArray _args = new JSONArray();        //参数
  private String _keys = "";                        //新增-名
  private String _values = "";                      //新增-值
  private String _data = "";                        //更新-数据
  private int _id = 0;                              //自增ID
  private int _nums = 0;                            //条数
  private HashMap<String, String> _columnsType = new HashMap<String, String>();   //字段类型

  /* 连接 */
  public Connection DBConn() {
    Connection conn=null;
    try {
      if(_db.equals("other")){
        if(Model.DBOther==null) Model.DBOther=DBPool(Db.Other());
        conn = DBOther.getConnection();
      }else{
        if(Model.DBDefault==null) Model.DBDefault=DBPool(Db.Default());
        conn = DBDefault.getConnection();
      }
    } catch (Exception e) {
      Print("[Model] Conn:", e.getMessage());
    }
    return conn;
  }

  /* 数据池 */
  public DruidDataSource DBPool(HashMap<String, Object> cfg) {
    DruidDataSource source = new DruidDataSource();
    try {
      // 配置
      source.setUrl("jdbc:"+(String)cfg.get("jdbc"));
      source.setUsername((String)cfg.get("user"));
      source.setPassword((String)cfg.get("password"));
      source.setDriverClassName((String)cfg.get("driver"));
      source.setInitialSize((int)cfg.get("min"));
      source.setMaxActive((int)cfg.get("max"));
      // 防止过期
      source.setValidationQuery("SELECT 1");
      source.setTestWhileIdle(true);
      source.setTestOnBorrow(true);
      source.setTestOnReturn(true);
      // 空闲检测(毫秒)
      source.setTimeBetweenEvictionRunsMillis(60000);
      // 等待超时(毫秒)
      source.setMaxWait((int)cfg.get("time"));
    } catch (Exception e) {
      Print("[Model] Pool:", e.getMessage());
    }
    return source;
  }

  /* 过滤 */
  public PreparedStatement Bind(Connection conn, Object sql, Object args) {
    return Bind(conn, sql, args, false);
  }
  public PreparedStatement Bind(Connection conn, Object sql, Object args, Boolean insert) {
    PreparedStatement ps = null;
    String name;
    String sqlStr = String.valueOf(sql);
    // 类型
    _type = insert?"insert":"";
    try {
      // 增加ID
      if(_type.equals("insert")){
        ps = conn.prepareStatement(sqlStr, Statement.RETURN_GENERATED_KEYS);
      }else{
        ps = conn.prepareStatement(sqlStr);
      }
      // 参数
      Object v;
      JSONArray data = (JSONArray)JSONArray.toJSON(args);
      for(int i=0; i<data.size(); i++){
        v = data.get(i);
        name = v.getClass().getSimpleName();
        switch(name) {
          case "String" : ps.setString(i+1, (String) v); break;
          case "Integer" : ps.setInt(i+1, ((Integer) v).intValue()); break;
          case "Double" : ps.setDouble(i+1, ((Double) v).doubleValue()); break;
          case "Float" : ps.setFloat(i+1, ((Float) v).floatValue()); break;
          case "Long" : ps.setLong(i+1, ((Long) v).longValue()); break;
          case "Boolean" : ps.setBoolean(i+1, ((Boolean) v).booleanValue()); break;
          case "Date" : ps.setDate(i+1, (Date) v); break;
        }
      }
      // 重置
    } catch (SQLException e) {
      Print("[Model] Bind:", e.getMessage());
    }
    return ps;
  }

  /* 查询 */
  public ResultSet Query(PreparedStatement ps) {
    ResultSet rs;
    try {
      rs = ps.executeQuery();
      return rs;
    } catch (SQLException e) {
      Print("[Model] Query:", e.getMessage());
      Print("[Model] SQL:", ps);
      return null;
    }
  }

  /* 执行 */
  public PreparedStatement Exec(PreparedStatement ps) {
    try {
      _nums = ps.executeUpdate();
      if(_type.equals("insert")){
        ResultSet rs = ps.getGeneratedKeys();
        _id = rs.next()?rs.getInt(1):0;
        rs.close();
      }
    } catch (SQLException e) {
      Print("[Model] Exec:", e.getMessage());
      Print("[Model] SQL:", ps);
    }
    return ps;
  }

  /* 获取-SQL */
  public String GetSql() {
    return _sql;
  }
  /* 获取-自增ID */
  public int GetID() {
    return _id;
  }
  /* 获取-条数 */
  public int GetNums() {
    return _nums;
  }
  
  /* 数据库 */
  public void DB(String db) {
    _db = db;
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
    JSONArray vals = new JSONArray();
    for(int i=0; i<columns.length; i++) vals.add(columns[i]);
    _columns = Util.Implode(", ", vals);
  }
  /* 字段-返回类型 */
  public void ResType(HashMap<String, String> type) {
    _columnsType = type;
  }
  /* 条件 */
  public void Where(String where, Object... args) {
    _where = where;
    for(Object v: args) {
      _args.add(v);
    }
  }
  /* 限制 */
  public void Limit(int start, int limit) {
    _limit = String.valueOf(start) + "," + String.valueOf(limit);
  }
  /* 排序 */
  public void Order(String... order) {
    JSONArray vals = new JSONArray();
    for(int i=0; i<order.length; i++) vals.add(order[i]);
    _order = Util.Implode(", ", vals);
  }
  /* 分组 */
  public void Group(String... group) {
    JSONArray vals = new JSONArray();
    for(int i=0; i<group.length; i++) vals.add(group[i]);
    _group = Util.Implode(", ", vals);
  }

  /* 分页 */
  public void Page(int page, int limit) {
    int start = (page - 1) * limit;
    _limit = String.valueOf(start) + "," + String.valueOf(limit);
  }

  /* 查询-SQL */
  public Object[] SelectSQL() {
    if(_table.equals("")){
      Print("[Model] Select: 表不能为空!");
      return null;
    }
    if(_table.equals("") || _columns.equals("")){
      Print("[Model] Select: 字段不能为空!");
      return null;
    }
    // 合成
    _sql = "SELECT " + _columns + " FROM " + _table;
    if(!_where.equals("")){
      _sql += " WHERE "+_where;
      _where = "";
    }
    if(!_group.equals("")){
      _sql += " GROUP BY "+_group;
      _group = "";
    }
    if(!_order.equals("")){
      _sql += " ORDER BY "+_order;
      _order = "";
    }
    if(!_limit.equals("")){
      _sql += " LIMIT "+_limit;
      _limit = "";
    }
    JSONArray args = _args;
    _args = new JSONArray();
    return new Object[]{_sql, args};
  }
  /* 查询-多条 */
  public ArrayList<HashMap<String,Object>> Find() {
    Object[] res = SelectSQL();
    Connection conn = DBConn();
    PreparedStatement ps = Bind(conn, res[0], res[1]);
    return FindDataAll(conn, ps);
  }
  /* 查询-单条 */
  public HashMap<String,Object> FindFirst() {
    Object[] res = SelectSQL();
    Connection conn = DBConn();
    PreparedStatement ps = Bind(conn, res[0], res[1]);
    ArrayList<HashMap<String,Object>> data = FindDataAll(conn, ps);
    if(data.isEmpty()) return new HashMap<String,Object>();
     return data.get(0);
  }
  /* 获取查询结果 */
  public ArrayList<HashMap<String,Object>> FindDataAll(Connection conn, PreparedStatement ps) {
    ArrayList<HashMap<String,Object>> res = new ArrayList<HashMap<String,Object>>();
    HashMap<String,Object> tmp ;
    ResultSetMetaData data;
    int num = 0;
    try {
      ResultSet rs = ps.executeQuery();
      data = rs.getMetaData();
      int n = data.getColumnCount();
      while (rs.next()) {
        tmp = new HashMap<String,Object>();
        for (int i = 1; i<=n; i++){
          if(_columnsType.containsKey(data.getColumnLabel(i))){
            tmp.put(data.getColumnLabel(i), Type.ToType(data.getColumnLabel(i), rs.getObject(i)));
          } else {
            tmp.put(data.getColumnLabel(i), String.valueOf(rs.getObject(i)));
          }
        }
        res.add(tmp);
        num++;
      }
      _nums = num;
      _columnsType = new HashMap<String, String>();
      // 释放
      rs.close();
      ps.close();
      conn.close();
      return res;
    } catch (SQLException e) {
      Print("[Model] Find: ", e.getMessage());
      return res;
    }
  }

  /* 添加-单条 */
  public void Values(HashMap<String, Object> data) {
    JSONArray keys = new JSONArray();
    JSONArray vals = new JSONArray();
    _args = new JSONArray();
    for(Entry<String, Object> entry : data.entrySet()){
      keys.add(entry.getKey());
      vals.add("?");
      _args.add(entry.getValue());
    }
    _keys = Util.Implode(", ", keys);
    _values = "(" + Util.Implode(", ", vals) + ")";
  }
  /* 添加-多条 */
  public void ValuesAll(ArrayList<HashMap<String, Object>> data) {
    JSONArray keys = new JSONArray();
    JSONArray vals = new JSONArray();
    JSONArray alls = new JSONArray();
    _args = new JSONArray();
    for(Entry<String, Object> entry : data.get(0).entrySet()){
      keys.add(entry.getKey());
      vals.add("?");
    }
    for(int i=0; i<data.size(); i++) {
      for(Entry<String, Object> entry : data.get(i).entrySet()) {
        _args.add(entry.getValue());
      }
      alls.add("(" + Util.Implode(", ", vals) + ")");
    }
    _keys = Util.Implode(", ", keys);
    _values = Util.Implode(", ", alls);
  }
  /* 添加-SQL */
  public Object[] InsertSQL() {
    if(_table.equals("")){
      Print("[Model] Insert: 表不能为空!");
      return null;
    }
    if(_keys.equals("") || _values.equals("")){
      Print("[Model] Insert: 数据不能为空!");
      return null;
    }
    _sql = "INSERT INTO `" + _table + "`(" + _keys + ") VALUES " + _values;
    JSONArray args = _args;
    // 重置
    _keys = "";
    _values = "";
    _args = new JSONArray();
    return new Object[]{_sql, args};
  }
  /* 添加-执行 */
  public boolean Insert() {
    try{
      Connection conn = DBConn();
      Object[] param = InsertSQL();
      PreparedStatement ps = Bind(conn, param[0], param[1], true);
      ps.close();
      conn.close();
      return true;
    } catch (SQLException e) {
      Print("[Model] Insert: ", e.getMessage());
      return false;
    }
  }
  /* 添加-自增ID */
  public int LastInsertId(PreparedStatement ps) throws SQLException {
    ResultSet rs = ps.getGeneratedKeys();
    return rs.next()?rs.getInt(1):0;
  }

  /* 更新-数据 */
  public void Set(HashMap<String, Object> data) {
    String vals = "";
    _args = new JSONArray();
    for(Entry<String, Object> entry : data.entrySet()){
      vals += entry.getKey() + "=?, ";
      _args.add(entry.getValue());
    }
    _data = vals.length()>0?vals.substring(0,vals.length()-2):"";
  }
  /* 更新-SQL */
  public Object[] UpdateSQL() {
    if(_table.equals("")){
      Print("[Model] Update: 表不能为空!");
      return null;
    }
    if(_data.equals("")){
      Print("[Model] Update: 数据不能为空!");
      return null;
    }
    if(_where.equals("")){
      Print("[Model] Update: 条件不能为空!");
      return null;
    }
    _sql = "UPDATE `" + _table + "` SET " + _data + " WHERE " + _where;
    JSONArray args = _args;
    // 重置
    _data = "";
    _where = "";
    _args = new JSONArray();
    return new Object[]{_sql, args};
  }
  /* 更新-执行 */
  public boolean Update() {
    try{
      Connection conn = DBConn();
      Object[] param = UpdateSQL();
      PreparedStatement ps = Bind(conn, param[0], param[1]);
      Exec(ps);
      ps.close();
      conn.close();
      return true;
    } catch (SQLException e) {
      Print("[Model] Update: ", e.getMessage());
      return false;
    }
  }

  /* 删除-SQL */
  public Object[] DeleteSQL() {
    if(_table.equals("")){
      Print("[Model] Delete: 表不能为空!");
      return null;
    }
    if(_where.equals("")){
      Print("[Model] Delete: 条件不能为空!");
      return null;
    }
    _sql = "DELETE FROM `" + _table + "` WHERE " + _where;
    JSONArray args = _args;
    // 重置
    _where = "";
    _args = new JSONArray();
    return new Object[]{_sql, args};
  }
  /* 删除-执行 */
  public boolean Delete() {
    try{
      Connection conn = DBConn();
      Object[] param = DeleteSQL();
      PreparedStatement ps = Bind(conn, param[0], param[1]);
      Exec(ps);
      ps.close();
      conn.close();
      return true;
    } catch (SQLException e) {
      Print("[Model] Delete: ", e.getMessage());
      return false;
    }
  }

}
