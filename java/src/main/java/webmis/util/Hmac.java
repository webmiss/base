package webmis.util;

import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.util.DigestUtils;

/* 加密 */
public class Hmac {

  /* Md5 */
  public static String Md5(String data) {
    return DigestUtils.md5DigestAsHex(data.getBytes());
  }

  /* Sha256 */
  public static byte[] Sha256(String data, String key) {
    try {
      byte[] byteKey = key.getBytes(StandardCharsets.UTF_8);
      Mac hmac = Mac.getInstance("HmacSHA256");
      SecretKeySpec keySpec = new SecretKeySpec(byteKey, "HmacSHA256");
      hmac.init(keySpec);
      return hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
    } catch (NoSuchAlgorithmException | InvalidKeyException e) {
      return null;
    }
  }
  
}
