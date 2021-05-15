package webmis.modules.demo;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.library.Upload;
import webmis.service.AdminToken;
import webmis.service.Base;
import webmis.service.Data;
import webmis.util.Url;

@RestController
@Controller("DemoTinymce")
@RequestMapping("/demo/tinymce")
public class Tinymce extends Base {

  private static final String ImgDir = "upload/tinymce/";

  /* 编辑 */
  @RequestMapping("edit")
  String Edit(HttpServletRequest request, String token, String content) {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 参数
    content = Url.Decode(content);
    // 图片回收
    Upload.HtmlImgClear(content, ImgDir);
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("content", Url.Encode(content));
    return GetJSON(res);
  }

  /* 图片 */
  @RequestMapping("upImg")
  String UpImg(HttpServletRequest request, String token, String base64) {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 参数
    if(base64==null || base64.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 上传
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("path",ImgDir);
    param.put("base64",base64);
    String img = Upload.Base64(param);
    if(img.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "上传失败!");
      return GetJSON(res);
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("img", Data.Img(ImgDir+img));
    return GetJSON(res);
  }
  
}
