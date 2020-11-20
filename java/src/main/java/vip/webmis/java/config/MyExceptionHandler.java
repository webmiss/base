package vip.webmis.java.config;

import java.util.HashMap;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MyExceptionHandler {

  @ExceptionHandler(value = Exception.class)
  Object handleException(Exception e){
    HashMap<String, Object> map = new HashMap<>();
    map.put("code", 5000);
    map.put("msg", e.getMessage());
    return map;
  }
  
}
