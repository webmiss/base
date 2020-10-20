package vip.webmis.java.modules.admin;

import java.io.File;
import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.Env;
import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.library.Inc;
import vip.webmis.java.library.Upload;
import vip.webmis.java.model.UserInfo;

@RestController
@Controller("UserInfoController")
@RequestMapping("/admin/Userinfo")
public class UserinfoController extends Base {

  private static String imgDir = "upload/user/img/";

  /* 头像上传 */
  @RequestMapping("/upImg")
  String index(String token, String base64) throws Exception {
    HashMap<String, Object> tokenData = AdminToken.urlVerify(token,"UserInfo");
    HashMap<String, Object> data;
    // 是否为空
    if(base64==null || base64.isEmpty()){
      data = new HashMap<String, Object>();
      data.put("code", 4000);
      data.put("msg", "Base64内容为空!");
      return getJSON(data);
    }
    // 上传
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("path",imgDir);
    param.put("base64",base64);
    HashMap<String, Object> res = Upload.base64(param);
    if(!res.isEmpty()){
      param = new HashMap<String, Object>();
      param.put("where","uid="+String.valueOf(tokenData.get("uid")));
      HashMap<String, Object> info = new UserInfo().findFirst(param);
      if(info.isEmpty()){
        param = new HashMap<String, Object>();
        param.put("uid",tokenData.get("uid"));
        param.put("img",imgDir+String.valueOf(res.get("filename")));
        param.put("ctime",Inc.date("y-M-d H:m:s"));
        new UserInfo().insert(param);
      }else{
        // 头像
        String img = !info.get("img").equals("")?String.valueOf(info.get("img")):"";
        // 保存
        param = new HashMap<String, Object>();
        param.put("uid",tokenData.get("uid"));
        param.put("img",imgDir+String.valueOf(res.get("filename")));
        param.put("utime",Inc.date("y-M-d H:m:s"));
        new UserInfo().update(param,"uid="+String.valueOf(tokenData.get("uid")));
        // 清理头像
        File file = new File(img);
        if(file.exists()) file.delete();
      }
      // 返回数据
      data = new HashMap<String, Object>();
      data.put("code", 0);
      data.put("msg", "成功");
      data.put("img", Env.base_url+imgDir+String.valueOf(res.get("filename")));
      return getJSON(data);
    }else{
      data = new HashMap<String, Object>();
      data.put("code", 5000);
      data.put("msg", "保存图片失败!");
      return getJSON(data);
    }
  }

}