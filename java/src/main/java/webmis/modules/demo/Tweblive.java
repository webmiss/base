package webmis.modules.demo;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.config.Tencent;
import webmis.library.tencent.Signature;
import webmis.service.AdminToken;
import webmis.service.Base;

/* TWebLive直播 */
@RestController
@Controller("DemoTweblive")
@RequestMapping("/demo/tweblive")
public class Tweblive extends Base {

  /* 列表 */
  @RequestMapping("list")
  String List(HttpServletRequest request, String token) {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.Verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 数据
    ArrayList<HashMap<String, Object>> data = new ArrayList<HashMap<String, Object>>();
    HashMap<String, Object> tmp;
    tmp = new HashMap<String, Object>();
    tmp.put("id", 1);
    tmp.put("group_id", "@TGS#aRHBAOFHK");
    tmp.put("name", "xxx直播1");
    data.add(tmp);
    tmp = new HashMap<String, Object>();
    tmp.put("id", 2);
    tmp.put("group_id", "@TGS#aRHBAOFHK");
    tmp.put("name", "xxx直播2");
    data.add(tmp);
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("list", data);
    return GetJSON(res);
  }

  /* 用户信息 */
  @RequestMapping("userInfo")
  String UserInfo(HttpServletRequest request, String token) {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.Verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    HashMap<String, Object> tData = AdminToken.Token(token);
    // 配置
    HashMap<String, Object> cfg = Tencent.TRTC();
    String userId = String.valueOf(tData.get("uid"));
    String userSin = Signature.UserSig(userId);
    // 数据
    HashMap<String, Object> uinfo = new HashMap<String, Object>();
    uinfo.put("sdk_app_id", cfg.get("SDKAppID"));
    uinfo.put("user_id", userId);
    uinfo.put("user_sig", userSin);
    uinfo.put("sdk_app_id", cfg.get("SDKAppID"));
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("uinfo", uinfo);
    return GetJSON(res);
  }
  
}
