package webmis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan
public class JavaApplication {

  public static void main(String[] args) throws Exception {
    // 框架
    SpringApplication.run(JavaApplication.class, args);
  }

}
