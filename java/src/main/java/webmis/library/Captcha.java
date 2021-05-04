package webmis.library;

import java.util.Random;
import webmis.service.Base;

public class Captcha extends Base {

  static final String txtChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  /* 验证码 */
  public void Vcode() {
    String code = GetCode(4);
    Print(code, code.toLowerCase());
  }

  /* 获取号码 */
  public String GetCode(int num) {
    Random random = new Random();
    StringBuffer sb=new StringBuffer();
    for(int i=0;i<num;i++){
      int number=random.nextInt(txtChars.length());
      sb.append(txtChars.charAt(number));
    }
    return sb.toString();
  }

}
