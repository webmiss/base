package webmis.library;

import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.Result;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.QRCodeWriter;

import webmis.config.Env;
import webmis.util.Util;

/* 二维码类 */
@SuppressWarnings("unchecked")
public class Qrcode {

  /* 生成 */
  public static byte[] Create(HashMap<String, Object> params) {
    // 参数
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("text", "");                      //内容
    param.put("size", 200);                     //大小
    param.put("tmpPath", "upload/tmp/");        //缓存目录
    param.put("filename", _getName()+".png");   //文件名
    param = Util.ArrayMerge(param, params);
    // 创建目录
    FileEo.Root = Env.root_dir;
    if(!FileEo.Mkdir(String.valueOf(param.get("tmpPath")))) return null;
    // 文件
    String file = param.get("tmpPath").toString() + param.get("filename").toString();
    // 生成
    QRCodeWriter qr = new QRCodeWriter();
    int width = Integer.valueOf(param.get("size").toString());
    int height = width;
    try {
      BitMatrix matrix = qr.encode(param.get("text").toString(), BarcodeFormat.QR_CODE, width, height);
      Path path = FileSystems.getDefault().getPath(Env.root_dir+file);
      MatrixToImageWriter.writeToPath(matrix, "png", path);
      // 内容
      byte[] ct = FileEo.Bytes(file);
      // 清理
      FileEo.RemoveAll(file);
      return ct;
    } catch (Exception e) {
      System.out.println("[Qrcode] Create: " + e.getMessage());
      return null;
    }
  }

  /* 识别 */
  public static String Scan(String file) {
    File ff = new File(file);
    BufferedImage img;
    try {
      img = ImageIO.read(ff);
      BinaryBitmap bit = new BinaryBitmap(new HybridBinarizer(new BufferedImageLuminanceSource(img)));
      MultiFormatReader qr = new MultiFormatReader();
      Result res = qr.decode(bit);
      return res.getText();
    } catch (Exception e) {
      System.out.println("[Qrcode] Scan: " + e.getMessage());
      return null;
    }
  }

  /* 获取名称 */
  private static String _getName(){
    DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSSS");
    LocalDateTime now = LocalDateTime.now();
    return df.format(now);
  }
  
}
