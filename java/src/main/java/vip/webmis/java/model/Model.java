package vip.webmis.java.model;

import vip.webmis.java.Env;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

import com.alibaba.druid.pool.DruidDataSource;

public class Model {

  private static DruidDataSource dataSource = null;
  protected String table = "f";

  /* 查询-全部 */
  public ResultSet fetchAll(String sql) {
    Connection conn = connect();
    System.out.print(table);
    try {
      PreparedStatement ps = conn.prepareStatement(sql);
      ResultSet res = ps.executeQuery();
      return res;
    } catch (SQLException e) {
      e.printStackTrace();
      return null;
    }
  }

  /* 链接 */
  public static Connection connect() {
    Connection conn=null;
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
        dataSource.setValidationQuery("SELECT 'x'");
        dataSource.setTestWhileIdle(true);
        dataSource.setTestOnBorrow(true);
        // 空闲检测(毫秒)
        dataSource.setTimeBetweenEvictionRunsMillis(20000);
        // 等待超时(毫秒)
        dataSource.setMaxWait(20000);
      }
      conn = (Connection) dataSource.getConnection();
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return conn;
  }

  /* 关闭-放回连接池 */
  public static void close(Connection conn) {
    if(conn!=null) {
      try {
        conn.close();
      } catch (SQLException e) {
        e.printStackTrace();
      }
    }
  }
  
}
