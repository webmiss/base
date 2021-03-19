package webmis.middleware;

import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MyExceptionHandler {

  @ExceptionHandler(value = Exception.class)
  Object handleException(Exception e, HttpServletResponse response){
    response.setStatus(200);
    HashMap<String, Object> map = new HashMap<>();
    map.put("code", 500);
    map.put("msg", e.getMessage());
    return map;
  }
  
}
