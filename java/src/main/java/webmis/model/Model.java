package webmis.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import com.alibaba.druid.pool.DruidDataSource;

import webmis.service.Base;
import webmis.config.Db;

/* 数据库 */
public class Model extends Base {

  public static Connection DBDefault = null;        //默认数据库
  public static Connection DBOther = null;          //其他数据库
  private Connection _conn = null;                  //链接
  private String _type = "";                        //类型: select、insert、update、delete
  private String _sql = "";                         //SQL
  private String _table = "";                       //数据表
  private String _columns = "";                     //字段
  private String _where = "";                       //条件
  private String _group = "";                       //分组
  private String _order = "";                       //排序
  private String _limit = "";                       //限制
  private PreparedStatement _bind = null;           //参数
  private String _keys = "";                        //新增-名
  private String _values = "";                      //新增-值
  private String _data = "";                        //更新-数据
  private int _id = 0;                              //自增ID
  private int _nums = 0;                            //条数

  /* 构造函数 */
  public Model(String db) {
    if(db.equals("other")){
      if(DBOther==null) Model.DBPool("other");
      _conn = DBOther;
    }else{
      if(DBDefault==null) Model.DBPool("");
      _conn = DBDefault;
    }
  }

  /* 数据池 */
  public static void DBPool(String db) {
    // 配置
    HashMap<String, Object> cfg;
    if(db=="other"){
      cfg = Db.Default();
    }else{
      cfg = Db.Default();
    }
    try {
      // 数据池
      DruidDataSource source = new DruidDataSource();
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
      // 多数据库
      if(db=="other"){
        DBOther = source.getConnection();
      }else{
        DBDefault = source.getConnection();
      }
      // 关闭
      source.close();
    } catch (Exception e) {
      Print("[Model] Conn:", e.getMessage());
    }
  }

  /* 链接 */
  public Connection Conn() {
    return _conn;
  }

  /* 过滤 */
  public PreparedStatement Bind(String sql) {
    return Bind(sql, false);
  }
  public PreparedStatement Bind(String sql, Boolean insert) {
    // 类型
    _type = insert?"insert":"";
    // 连接
    if(_conn==null) return _bind;
    try {
      if(_type.equals("insert")){
        _bind = _conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
      }else{
        _bind = _conn.prepareStatement(sql);
      }
    } catch (SQLException e) {
      Print("[Model] Bind:", e.getMessage());
    }
    return _bind;
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
      return ps;
    } catch (SQLException e) {
      Print("[Model] Exec:", e.getMessage());
      Print("[Model] SQL:", ps);
      return null;
    }
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
    _columns = _columns.length()>0?_columns.substring(0,_columns.length()-2):"";
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
    if(_table.equals("")){
      Print("[Model] Select: 表不能为空!");
      return "";
    }
    if(_table.equals("") || _columns.equals("")){
      Print("[Model] Select: 字段不能为空!");
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
  public ArrayList<HashMap<String,Object>> Find(PreparedStatement ps) {
    return FindDataAll(ps);
  }
  /* 查询-单条 */
  public HashMap<String,Object> FindFirst(PreparedStatement ps) {
    ArrayList<HashMap<String,Object>> data = FindDataAll(ps);
    if(data.isEmpty()) return null;
     return data.get(0);
  }
  /* 获取查询结果 */
  public ArrayList<HashMap<String,Object>> FindDataAll(PreparedStatement ps) {
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
        for (int i = 1; i<=n; i++) tmp.put(data.getColumnLabel(i), rs.getObject(i));
        res.add(tmp);
        num++;
      }
      _nums = num;
      // 释放
      rs.close();
      ps.close();
      return res;
    } catch (SQLException e) {
      Print("[Model] Find: ", e.getMessage());
      return null;
    }
  }

  /* 添加-数据 */
  public void Values(String... columns) {
    String keys = "";
    String vals = "";
    for(int i=0; i<columns.length; i++){
      keys += columns[i] + ", ";
      vals += "?, ";
    }
    _keys = keys.length()>0?keys.substring(0,keys.length()-2):"";
    _values = vals.length()>0?vals.substring(0,vals.length()-2):"";
  }
  /* 添加-SQL */
  public String InsertSql() {
    if(_table.equals("")){
      Print("[Model] Insert: 表不能为空!");
      return "";
    }
    if(_keys.equals("") || _values.equals("")){
      Print("[Model] Insert: 数据不能为空!");
      return "";
    }
    _sql = "INSERT INTO `" + _table + "`(" + _keys + ") values(" + _values + ")";
    // 重置
    _keys = "";
    _values = "";
    return _sql;
  }
  /* 添加-执行 */
  public boolean Insert(PreparedStatement ps) {
    return Exec(ps)!=null?true:false;
  }

  /* 更新-数据 */
  public void Set(String... columns) {
    String vals = "";
    for(int i=0; i<columns.length; i++){
      vals += columns[i] + "=?, ";
    }
    _data = vals.length()>0?vals.substring(0,vals.length()-2):"";
  }
  /* 更新-SQL */
  public String UpdateSql() {
    if(_table.equals("")){
      Print("[Model] Update: 表不能为空!");
      return "";
    }
    if(_data.equals("")){
      Print("[Model] Update: 数据不能为空!");
      return "";
    }
    if(_where.equals("")){
      Print("[Model] Update: 条件不能为空!");
      return "";
    }
    _sql = "UPDATE `" + _table + "` SET " + _data + " WHERE " + _where;
    // 重置
    _data = "";
    _where = "";
    return _sql;
  }
  /* 更新-执行 */
  public boolean Update(PreparedStatement ps) {
    return Exec(ps)!=null?true:false;
  }

  /* 删除-SQL */
  public String DeleteSql() {
    if(_table.equals("")){
      Print("[Model] Delete: 表不能为空!");
      return "";
    }
    if(_where.equals("")){
      Print("[Model] Delete: 条件不能为空!");
      return "";
    }
    _sql = "DELETE FROM `" + _table + "` WHERE " + _where;
    // 重置
    _where = "";
    return _sql;
  }
  /* 删除-执行 */
  public boolean Delete(PreparedStatement ps) {
    return Exec(ps)!=null?true:false;
  }

}
