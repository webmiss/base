package vip.webmis.java.modules.admin;

import java.io.File;
import java.util.HashMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.Env;
import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.common.Inc;
import vip.webmis.java.library.Upload;
import vip.webmis.java.model.UserInfo;

@RestController
@Controller("UserInfoController")
@RequestMapping("/admin/Userinfo")
public class UserinfoController extends Base {

  private static String imgDir = "upload/user/img/";

  /* 列表 */
  @RequestMapping("/list")
  String list(String token) throws Exception {
    HashMap<String, Object> tokenData = AdminToken.urlVerify(token,"UserInfo");
    HashMap<String, Object> _res;
    // 查询
    UserInfo m1 = new UserInfo();
    m1.where("uid="+tokenData.get("uid").toString());
    HashMap<String, Object> info = m1.findFirst();
    // 添加
    if(info.isEmpty()){
      UserInfo m2 = new UserInfo();
      m2.uid = tokenData.get("uid").toString();
      m2.ctime = Inc.date("yyyy-MM-dd HH:mm:ss");
      m2.create();
      // 查询
      UserInfo m3 = new UserInfo();
      m3.where("uid="+tokenData.get("uid").toString());
      info = m3.findFirst();
    }
    // 数据
    HashMap<String, Object> list = new HashMap<String, Object>();
    list.put("img",info.get("img")!=null&&!info.get("img").equals("")?Env.base_url+String.valueOf(info.get("img")):"");
    list.put("nickname",info.get("nickname"));
    list.put("name",info.get("name"));
    list.put("gender",info.get("gender"));
    list.put("birthday",info.get("birthday")!=null?info.get("birthday"):"");
    list.put("position",info.get("position"));
    // 返回
    _res = new HashMap<String, Object>();
    _res.put("code", 0);
    _res.put("msg", "成功");
    _res.put("list", list);
    return getJSON(_res);
  }

  /* 编辑 */
  @RequestMapping("/edit")
  String edit(String token, String data) throws Exception {
    HashMap<String, Object> tokenData = AdminToken.urlVerify(token,"UserInfo");
    HashMap<String, Object> _res;
    if(data==null || data.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    JSONObject jsonData = JSON.parseObject(data);
    // 数据

    UserInfo model = new UserInfo();
    model.nickname = jsonData.get("nickname").toString().trim();
    model.name = jsonData.get("name").toString().trim();
    model.gender = jsonData.get("gender").toString().trim();
    model.birthday = jsonData.get("birthday").toString().trim();
    model.position = jsonData.get("position").toString().trim();
    model.uField("nickname,name,gender,birthday,position");
    model.where("uid="+tokenData.get("uid").toString());
    // 用户信息
    HashMap<String,Object> uinfo = new HashMap<String,Object>();
    uinfo.put("img",jsonData.get("img").toString().trim());
    uinfo.put("nickname",jsonData.get("nickname").toString().trim());
    uinfo.put("name",jsonData.get("name").toString().trim());
    uinfo.put("gender",jsonData.get("gender").toString().trim());
    uinfo.put("birthday",jsonData.get("birthday").toString().trim());
    uinfo.put("position",jsonData.get("position").toString().trim());
    // 保存
    if(model.update()){
      _res = new HashMap<String, Object>();
      _res.put("code", 0);
      _res.put("msg", "成功");
      _res.put("uinfo", uinfo);
      return getJSON(_res);
    }else{
      _res = new HashMap<String, Object>();
      _res.put("code", 5000);
      _res.put("msg", "保存失败!");
      return getJSON(_res);
    }
  }

  /* 头像上传 */
  @RequestMapping("/upImg")
  String index(String token, String base64) throws Exception {
    HashMap<String, Object> tokenData = AdminToken.urlVerify(token,"UserInfo");
    HashMap<String, Object> _res;
    // 是否为空
    if(base64==null || base64.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "Base64内容为空!");
      return getJSON(_res);
    }
    // 上传
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("path",imgDir);
    param.put("base64",base64);
    HashMap<String, Object> res = Upload.base64(param);
    if(!res.isEmpty()){
      UserInfo m1 = new UserInfo();
      m1.where("uid="+tokenData.get("uid").toString());
      m1.columns("img");
      HashMap<String, Object> info = m1.findFirst();
      // 头像
      String img = !info.get("img").equals("")?info.get("img").toString():"";
      // 保存
      UserInfo m2 = new UserInfo();
      m2.img = imgDir+res.get("filename").toString();
      m2.uField("img,utime");
      m2.where("uid="+tokenData.get("uid").toString());
      if(m2.update()){
        // 清理头像
        File file = new File(img);
        if(file.exists()) file.delete();
        // 返回
        _res = new HashMap<String, Object>();
        _res.put("code", 0);
        _res.put("msg", "上传成功");
        _res.put("img", Env.base_url+imgDir+String.valueOf(res.get("filename")));
        return getJSON(_res);
      }else{
        _res = new HashMap<String, Object>();
        _res.put("code", 5000);
        _res.put("msg", "保存数据失败!");
        return getJSON(_res);
      }
    }else{
      _res = new HashMap<String, Object>();
      _res.put("code", 5000);
      _res.put("msg", "保存图片失败!");
      return getJSON(_res);
    }
  }

}