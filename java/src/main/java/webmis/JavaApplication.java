package webmis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import webmis.library.Casbin;
import webmis.model.Model;

@SpringBootApplication
public class JavaApplication {

  public static void main(String[] args) throws Exception {
    // 框架
    SpringApplication.run(JavaApplication.class, args);
    // 权限
    Casbin casbin = new Casbin();
    casbin.CasBinPool();
    // 默认数据库
    Model.DBPool("");
  }

}
