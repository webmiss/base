package webmis.modules.home;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.HashMap;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.config.Env;
import webmis.library.Captcha;
import webmis.library.FileEo;
import webmis.library.Qrcode;
import webmis.model.Demo;
import webmis.service.Base;

@RestController
@Controller("Index")
@RequestMapping("/")
public class Index extends Base{

  /* 首页 */
  @RequestMapping("")
  String index() {
    Demo model = new Demo();
    HashMap<String, Object> data = new HashMap<String, Object>();
    data.put("title", "测试1");
    data.put("ctime", 1);
    model.Values(data);
    Object[] sql = model.InsertSql();
    // Connection conn = model.DBConn();
    // PreparedStatement ps = model.Bind(conn, sql[0], sql[1]);
    Print(sql[0], sql[1]);
    // 返回
    HashMap<String,Object> res;
    res = new HashMap<String,Object>();
    res.put("code",0);
    res.put("msg","Web");
    return GetJSON(res);
  }

  /* 验证码 */
  @RequestMapping("vcode")
  String vcode() {
    Captcha c = new Captcha();
    c.Vcode();
    return "";
  }

  /* 二维码 */
  @RequestMapping(value = "index/qrcode/{name}", produces=MediaType.IMAGE_PNG_VALUE)
  byte[] Qrcode(@PathVariable("name") String name) {
    String text="";
    if(name.equals("docs")) text="https://webmis.vip/";
    else if(name.equals("demo")) text="https://demo-app.webmis.vip/";
    else if(name.equals("wechat")) text="http://weixin.qq.com/r/mC1YQK3EDPBzrekj93iK";
    else if(name.equals("server1")) text="https://u.wechat.com/MNFMyg4xN7d6ihWrfoWD7So";
    else if(name.equals("server2")) text="https://u.wechat.com/MC35ApmM-JB7K6cJD6CaYJo";
    // 创建目录
    String path = "upload/qrcode/";
    FileEo.Root = Env.root_dir;
    if(!FileEo.Mkdir(path)) return null;
    // 是否生成
    String file = path + name + ".png";
    if(!FileEo.IsFile(file)){
      HashMap<String, Object> params = new HashMap<String, Object>();
      params.put("text", text);
      byte[] ct = Qrcode.Create(params);
      FileEo.Writer(file, ct);
    }
    return FileEo.Bytes(file);
  }

}
