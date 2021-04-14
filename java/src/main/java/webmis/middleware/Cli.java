package webmis.middleware;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import webmis.task.Redis;

/* 命令行 */
@Component
public class Cli {

  @Bean
  public void Init() {
    // 监听日志
    Redis logs = new Redis();
    logs.start();
  }
  
}
