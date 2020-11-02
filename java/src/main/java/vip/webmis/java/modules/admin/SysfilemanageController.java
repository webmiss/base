package vip.webmis.java.modules.admin;

import java.io.File;
import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.library.MyFiles;

/* 文件管理 */
@RestController
@Controller("SysFileManageController")
@RequestMapping("/admin/Sysfilemanage")
public class SysfilemanageController extends Base {

  private static String dirRoot = "upload/";

  /* 构造函数 */
  SysfilemanageController(){
    // 文件根目录
    MyFiles.file_root = dirRoot;
    File dir = new File(dirRoot);
    if (!dir.exists()) dir.mkdirs();
  }

  /* 列表 */
  @RequestMapping("/list")
  String list(String token, String path) throws Exception {
    AdminToken.urlVerify(token,"SysFileManage");

    HashMap<String, Object> list = MyFiles.lists(path);
    // 返回数据
    HashMap<String, Object> _res = new HashMap<String, Object>();
    _res.put("code", 0);
    _res.put("msg", "成功");
    _res.put("data", list);
    return getJSON(_res);
  }

}
