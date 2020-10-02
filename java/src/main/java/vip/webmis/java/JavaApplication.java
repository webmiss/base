package vip.webmis.java;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JavaApplication {

  public static void main(String[] args) throws Exception {
    try{
      SpringApplication.run(JavaApplication.class, args);
    } catch(Exception e) {
      System.out.println("cuow"+e.getMessage());
    }
    
  }

}
