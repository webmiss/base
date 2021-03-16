package webmis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import webmis.model.Model;

@SpringBootApplication
public class JavaApplication {

  public static void main(String[] args) throws Exception {
    // 框架
    SpringApplication.run(JavaApplication.class, args);
    // 默认数据库
    Model.DBPool("");
  }

}
