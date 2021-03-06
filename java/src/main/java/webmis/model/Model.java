package webmis.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;

import com.alibaba.druid.pool.DruidDataSource;

import webmis.base.Base;
import webmis.config.Db;

/* 数据库 */
public class Model extends Base {

  private static DruidDataSource _source = null;    //数据源
  private static Connection _conn = null;           //链接
  private static String _sql = "";                  //SQL
  private static String _table = "";                //数据表
  private static String _columns = "";              //字段
  private static String _where = "";                //条件
  private static String _group = "";                //分组
  private static String _order = "";                //排序
  private static String _limit = "";                //限制
  private static String _args = "";                 //参数
  private static String _keys = "";                 //新增-名
  private static String _values = "";               //新增-值
  private static String _data = "";                 //更新-数据

  /* 链接数据库 */
  public Connection Conn() {
    try {
      if(_source==null){
        _source = new DruidDataSource();
        _source.setUrl("jdbc:mysql://"+Db.Host+":"+Db.Port+"/"+Db.Database+"?characterEncoding="+Db.Charset+"&useSSL=false&serverTimezone=Asia/Shanghai");
        _source.setUsername(Db.User);
        _source.setPassword(Db.Password);
        _source.setDriverClassName(Db.Driver);
        // 数据池
        _source.setInitialSize(Db.Min);
        _source.setMaxActive(Db.Max);
        _source.setTimeBetweenEvictionRunsMillis(10000);  //空闲检测(毫秒)
        _source.setMaxWait(30000);  //等待超时(毫秒)
        // 防止过期
        _source.setValidationQuery("SELECT 1");
        _source.setTestWhileIdle(true);
        _source.setTestOnBorrow(true);
        _source.setTestOnReturn(true);
      }
      return _source.getConnection();
    } catch (Exception e) {
      System.out.println("[Model] Conn:"+e.getMessage());
      return _conn;
    }
  }

  /* 查询 */
  public PreparedStatement Query(String sql){
    // 连接
    _conn = Conn();
    if(_conn == null) return null;
    try {
      PreparedStatement ps = _conn.prepareStatement(sql);
      return ps;
    } catch (SQLException e) {
      System.out.println("[Model] Query:"+e.getMessage());
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
      System.out.println("Model[Select]: 数据表、字段不能为空!");
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
  public void Find() {
    String sql = SelectSql();
    PreparedStatement ps = Query(sql);

    // System.out.println(sql);
    this.Print(sql);
    Print(ps);
    System.out.println(ps);
  }

}
