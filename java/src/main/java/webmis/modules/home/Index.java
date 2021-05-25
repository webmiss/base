package webmis.modules.home;

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
import webmis.library.aliyun.Oss;
import webmis.service.Base;
import webmis.util.Base64;

@RestController
@Controller("Index")
@RequestMapping("/")
public class Index extends Base{

  /* 首页 */
  @RequestMapping("")
  String index() {
    String object = "mytest/java.png";
    byte[] content = "iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAYAAAC9+TVUAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAA9aVRYdENyZWF0aW9uIFRpbWUAAAAAADIwMjHlubQwNeaciDI05pelIOaYn+acn+S4gCAxN+aXtjQy5YiGMDjnp5IIYwcbAAADP0lEQVQ4jXWTu29cVRDGf3PO2fXu9d7NxvE7sYnZKMQExRQk6cApI1AqhJQGiYJ0/A00iJaakgIkHhKPAilFIoRIkCMSCWTsyNhOsPMgfqxj7+Pu7r3nDMXaQSkYaaQZab4ZfTPfyO5HZxSfosYCQm2nzWYXfOSotTwlB0UvjPRBpezAWshSRAwYi2YpDlVQaCWe1a4w+kaZmek++iIBBYCkEVif7zL/a5NqBEWnIAoagIDsfvyq7u11+Dt2nH2nRL5geIZ+zoR2K3D76zpTLaUUWTAGzVJMlgXuaeD85Zh8Qf6nQc8KkXDucpkVHwg+gCqiilnb6vLSpQqPVlLmfmyCSA+hsh/vu8DN7xs8Xu1y4mLMw60OBI8Gj2vGhsOuS/KkTvloERT2aoGNtZSn/wSOncqhCmNTOU5PeeTJDoVqzL2iZcLmEMD0jwuapLhuRtQXACgPWHZWHbn5Myxf62N40vXoGHBpgKC4IUvwCqo449vkqyPkq4ee4z/8omNv3TJUFawTuonyx2NHLlcmLAt0ugQPEjJc42GKNhIkjkAPlipMzij1YwvEAwYQth+n5LKEuGTYfODZXe3gTsSQCSZKSjz4bZvQaB3gAUUEyoMGsb187HiexBdodoskGwlHS9F+veCmBoXFn4VWfZORkxG1JGJoso94wO5fCVClVWuzsQLtRspwM89EVSDroD7Fic1jbYlb1wtMthJmZvP8dbvJcH+duGLQoNRrGYt3hph98xJPHz1h5+YNxDkQiyA4r9AoDvLWBxdZmLvK3WvbeG9Yqp+iXOnHZ4GdWsJrF6aJz17B/v4Z93+ae6YdBJwNKX6vTmnsJOfffoWwfp3gPcaa/8QrIAhh6StcSAhBwaegBw9oHUdcg7VfvmOiOgiqGGOeV7+Comj9IZoFMjWodYhYsAGDCM3UUK4U0aBsbbRIU9+bLtJTvsL2VkK3k+JyhsLYKEmndxkRg9EsI3ExlSMRjXqHbz//k/X7DWTkHM3K62Sjs7Q4zA9f3mV5cQNQxqtDbG4l4DPUZ7h2ZuifvoA9/S6HUd5/+T42HuXG1QVuffMFgnDl009478Pj2EMTSGGAkfE97swt8YK0QYR/ATsNfzHf0tKvAAAAAElFTkSuQmCC".getBytes();
    boolean data = Oss.PutObject(object, Base64.Decode(content));
    Print(data);
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
